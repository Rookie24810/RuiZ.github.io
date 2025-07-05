// script.js
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // 初始化页面显示
    function initPages() {
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById('home').classList.add('active');
    }
    
    initPages();
    
    // 页面切换
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // 更新活动导航链接
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // 显示目标页面
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    // 添加延迟以允许CSS过渡生效
                    setTimeout(() => {
                        page.classList.add('active');
                    }, 10);
                }
            });
            
            // 关闭移动菜单
            navLinksContainer.classList.remove('active');
            
            // 滚动到顶部 - 解决页面跳转后位置问题
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // 如果是技能页面，初始化进度条动画
            if(targetPage === 'skills') {
                animateSkillBars();
            }
        });
    });
    
    // 移动菜单切换
    mobileMenuBtn.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
    });
    
    // 作品集筛选
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新活动按钮
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // 筛选作品
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 技能条动画
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // 表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 显示成功消息
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
            submitBtn.disabled = true;
            
            // 模拟发送延迟
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> 发送成功';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // 页面加载时初始化技能条（如果当前在技能页面）
    if(document.getElementById('skills').classList.contains('active')) {
        animateSkillBars();
    }
});