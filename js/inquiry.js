/**
 * 询价单系统 - 核心逻辑
 * Three Squirrels Overseas - Inquiry List System
 * 
 * 功能：
 * - 将产品加入/移出询价单
 * - localStorage持久化
 * - 数量管理（基于MOQ）
 * - 生成PDF/CSV/WhatsApp消息
 */

const INQUIRY_KEY = 'ts_overseas_inquiry';
const COMPANY_PHONE = '+86 400-888-8888';  // 销售联系电话
const COMPANY_EMAIL = 'overseas@three-squirrels.com';  // 销售邮箱

// 产品数据结构
// {
//   id: 'product-001',
//   name: 'Premium Mixed Nuts Selection',
//   category: 'Nuts & Seeds',
//   image: 'https://...',
//   moq: 500,
//   unit: 'boxes',
//   priceMin: 2.80,
//   priceMax: 4.50,
//   currency: 'USD',
//   tags: ['halal', 'organic', 'custom']
// }

// ─────────────────────────────────
//  核心数据操作
// ─────────────────────────────────

function getInquiryList() {
  try {
    return JSON.parse(localStorage.getItem(INQUIRY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveInquiryList(list) {
  localStorage.setItem(INQUIRY_KEY, JSON.stringify(list));
}

function addToInquiry(product) {
  const list = getInquiryList();
  const exists = list.find(p => p.id === product.id);
  if (exists) {
    return false; // 已存在
  }
  list.push({ ...product, qty: product.moq || 1 }); // 默认按MOQ起量
  saveInquiryList(list);
  updateCartBadge();
  return true;
}

function removeFromInquiry(productId) {
  let list = getInquiryList();
  list = list.filter(p => p.id !== productId);
  saveInquiryList(list);
  updateCartBadge();
  updateCartPanel();
}

function updateProductQty(productId, qty) {
  const list = getInquiryList();
  const item = list.find(p => p.id === productId);
  if (item) {
    // 数量不能低于MOQ
    item.qty = Math.max(qty, item.moq || 1);
    saveInquiryList(list);
  }
}

function clearInquiry() {
  localStorage.removeItem(INQUIRY_KEY);
  updateCartBadge();
}

// ─────────────────────────────────
//  购物车Badge更新
// ─────────────────────────────────

function updateCartBadge() {
  const list = getInquiryList();
  const count = list.length;
  
  // 查找所有购物车徽章
  document.querySelectorAll('.inquiry-badge').forEach(badge => {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });
}

// ─────────────────────────────────
//  侧边栏询价单浮窗
// ─────────────────────────────────

let cartPanelOpen = false;

function toggleCartPanel() {
  const panel = document.getElementById('inquiryCartPanel');
  if (!panel) return;
  
  cartPanelOpen = !cartPanelOpen;
  if (cartPanelOpen) {
    updateCartPanel();
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    panel.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function updateCartPanel() {
  const list = getInquiryList();
  const panel = document.getElementById('inquiryCartPanel');
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const emptyEl = document.getElementById('cartEmpty');
  const contentEl = document.getElementById('cartContent');
  
  if (!panel) return;
  
  if (list.length === 0) {
    if (emptyEl) emptyEl.style.display = 'flex';
    if (contentEl) contentEl.style.display = 'none';
    if (totalEl) totalEl.style.display = 'none';
    return;
  }
  
  if (emptyEl) emptyEl.style.display = 'none';
  if (contentEl) contentEl.style.display = 'block';
  if (totalEl) totalEl.style.display = 'block';
  
  if (itemsEl) {
    itemsEl.innerHTML = list.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" 
             onerror="this.src='https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=80&h=80&fit=crop'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">MOQ: ${item.moq} ${item.unit || 'units'} | $${item.priceMin?.toFixed(2)} - $${item.priceMax?.toFixed(2)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="adjustCartQty('${item.id}', -100)">−</button>
            <input type="number" value="${item.qty}" min="${item.moq || 1}" step="${item.moq || 1}"
                   onchange="updateCartQtyInput('${item.id}', this.value)">
            <button class="qty-btn" onclick="adjustCartQty('${item.id}', 100)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromInquiry('${item.id}')" title="Remove">
          <i data-lucide="x"></i>
        </button>
      </div>
    `).join('');
    
    // 重新初始化Lucide图标
    if (window.lucide) lucide.createIcons();
  }
  
  // 计算总金额估算
  if (totalEl) {
    const estTotal = list.reduce((sum, item) => sum + (item.priceMin * item.qty), 0);
    totalEl.innerHTML = `
      <span>${list.length} products selected</span>
      <span class="cart-total-est">Est. from $${estTotal.toFixed(2)}</span>
    `;
  }
}

function adjustCartQty(productId, delta) {
  const list = getInquiryList();
  const item = list.find(p => p.id === productId);
  if (item) {
    const newQty = Math.max(item.moq || 1, item.qty + delta);
    updateProductQty(productId, newQty);
    updateCartPanel();
  }
}

function updateCartQtyInput(productId, value) {
  const qty = parseInt(value) || 1;
  updateProductQty(productId, qty);
  updateCartPanel();
}

// ─────────────────────────────────
//  添加按钮交互
// ─────────────────────────────────

function addProductToInquiry(btn, productData) {
  const added = addToInquiry(productData);
  
  if (added) {
    // 成功动画
    btn.innerHTML = '<i data-lucide="check"></i> Added';
    btn.classList.add('added');
    if (window.lucide) lucide.createIcons();
    
    // 按钮恢复
    setTimeout(() => {
      btn.innerHTML = '<i data-lucide="file-text"></i> Add to Quote';
      btn.classList.remove('added');
      if (window.lucide) lucide.createIcons();
    }, 2000);
    
    // 显示浮窗
    if (!cartPanelOpen) {
      setTimeout(() => toggleCartPanel(), 300);
    }
  } else {
    // 已存在
    btn.innerHTML = '<i data-lucide="check"></i> Already in Quote';
    btn.classList.add('added');
    if (window.lucide) lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = '<i data-lucide="file-text"></i> Add to Quote';
      btn.classList.remove('added');
      if (window.lucide) lucide.createIcons();
    }, 1500);
  }
}

// ─────────────────────────────────
//  生成询价单内容（用于各种提交方式）
// ─────────────────────────────────

function generateInquiryText() {
  const list = getInquiryList();
  if (list.length === 0) return '';
  
  const total = list.reduce((sum, item) => sum + (item.priceMin * item.qty), 0);
  
  let text = `🐿️ THREE SQUIRRELS OVERSEAS - PRODUCT INQUIRY\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  text += `📋 PRODUCT LIST:\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  list.forEach((item, i) => {
    text += `${i + 1}. ${item.name}\n`;
    text += `   Category: ${item.category}\n`;
    text += `   MOQ: ${item.moq} ${item.unit || 'units'}\n`;
    text += `   Qty Required: ${item.qty} ${item.unit || 'units'}\n`;
    text += `   Price Range: $${item.priceMin?.toFixed(2)} - $${item.priceMax?.toFixed(2)} / unit\n`;
    text += `   Est. Subtotal: $${((item.priceMin || 0) * item.qty).toFixed(2)}\n\n`;
  });
  
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📊 TOTAL: ${list.length} products | Est. from $${total.toFixed(2)}\n\n`;
  text += `🏢 COMPANY INFO:\n`;
  text += `Company: [Your Company Name]\n`;
  text += `Contact: [Your Name]\n`;
  text += `Email: [your@email.com]\n`;
  text += `Phone/WhatsApp: [Your Phone]\n`;
  text += `Message: [Any special requirements]\n\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📞 Contact our sales team:\n`;
  text += `Email: ${COMPANY_EMAIL}\n`;
  text += `WhatsApp: ${COMPANY_PHONE}\n`;
  text += `Website: https://three-squirrels-overseas.com\n`;
  
  return text;
}

// ─────────────────────────────────
//  WhatsApp 发送
// ─────────────────────────────────

function sendViaWhatsApp() {
  const text = generateInquiryText();
  if (!text) {
    alert('Your inquiry list is empty. Please add products first.');
    return;
  }
  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/?text=${encoded}`, '_blank');
}

// ─────────────────────────────────
//  邮件发送
// ─────────────────────────────────

function sendViaEmail() {
  const list = getInquiryList();
  if (list.length === 0) {
    alert('Your inquiry list is empty. Please add products first.');
    return;
  }
  
  const subject = encodeURIComponent('Product Inquiry from Three Squirrels Overseas Website');
  const body = encodeURIComponent(generateInquiryText());
  window.location.href = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`;
}

// ─────────────────────────────────
//  下载CSV
// ─────────────────────────────────

function downloadCSV() {
  const list = getInquiryList();
  if (list.length === 0) {
    alert('Your inquiry list is empty. Please add products first.');
    return;
  }
  
  const headers = ['#', 'Product Name', 'Category', 'MOQ', 'Unit', 'Qty Required', 'Price Min (USD)', 'Price Max (USD)', 'Est. Subtotal (USD)'];
  const rows = list.map((item, i) => [
    i + 1,
    `"${item.name}"`,
    `"${item.category}"`,
    item.moq,
    item.unit || 'units',
    item.qty,
    (item.priceMin || 0).toFixed(2),
    (item.priceMax || 0).toFixed(2),
    ((item.priceMin || 0) * item.qty).toFixed(2)
  ]);
  
  const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `ThreeSquirrels-Inquiry-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

// ─────────────────────────────────
//  初始化
// ─────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  
  // 为所有"Add to Quote"按钮绑定事件
  document.querySelectorAll('.add-to-inquiry-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const productData = {
        id: this.dataset.productId,
        name: this.dataset.productName,
        category: this.dataset.productCategory,
        image: this.dataset.productImage,
        moq: parseInt(this.dataset.productMoq) || 1,
        unit: this.dataset.productUnit || 'units',
        priceMin: parseFloat(this.dataset.productPriceMin) || 0,
        priceMax: parseFloat(this.dataset.productPriceMax) || 0,
        tags: (this.dataset.productTags || '').split(',').filter(t => t)
      };
      addProductToInquiry(this, productData);
    });
  });
  
  // ESC键关闭浮窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartPanelOpen) {
      toggleCartPanel();
    }
  });
});
