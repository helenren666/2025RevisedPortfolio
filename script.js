function toggleScroll(element) {
    // 先移除所有 scroll 的 expanded 类，但不改变位置
    document.querySelectorAll('.scroll').forEach(scroll => {
        if (scroll !== element) {
            scroll.classList.remove('expanded');
            let otherScrollBottom = scroll.querySelector('.scroll-bottom');
            if (otherScrollBottom) {
                otherScrollBottom.style.transform = "translateX(-50%) translateY(0)"; // 其他 scroll-bottom 归位
            }
            scroll.style.transform = "translateY(0)"; // 保证其他 scroll 不会移动
        }
    });

    // 切换当前 scroll 的 expanded 类
    element.classList.toggle('expanded');

    // 找到当前的 scroll-bottom
    let scrollBottom = element.querySelector('.scroll-bottom');

    if (element.classList.contains('expanded')) {
        scrollBottom.style.transform = "translateX(-50%) translateY(100px)"; // 让它下移
    } else {
        scrollBottom.style.transform = "translateX(-50%) translateY(0)"; // 复原
    }

    // 关键修正：确保其他 scroll 绝对不跟着移动
    element.style.transform = "translateY(0)";
}
