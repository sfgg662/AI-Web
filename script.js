// 简单的平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

console.log("AI 写作助手已加载");

// 智能批改页面：绑定生成按钮并与后端或本地模拟交互
document.addEventListener('DOMContentLoaded', () => {
    // 如果页面通过 URL 参数传入 original/idea，则自动填充相应文本框
    try {
        const params = new URLSearchParams(window.location.search);
        const originalParam = params.get('original');
        const ideaParam = params.get('idea');
        if (originalParam) {
            const oi = document.getElementById('originalInput');
            if (oi) oi.value = originalParam;
        }
        if (ideaParam) {
            const ii = document.getElementById('ideaInput');
            if (ii) ii.value = ideaParam;
        }
    } catch (e) {
        // ignore
    }

    const generateBtn = document.getElementById('generateBtn');
    if (!generateBtn) return;

    generateBtn.addEventListener('click', async () => {
        const originalInput = document.getElementById('originalInput');
        const ideaInput = document.getElementById('ideaInput');
        const resultBox = document.getElementById('resultBox');

        const original = originalInput.value.trim();
        const idea = ideaInput.value.trim();
        if (!original || !idea) {
            alert('请填写原题和立意');
            return;
        }

        if (resultBox) {
            resultBox.style.display = 'block';
            resultBox.value = '生成中，请稍候...';
        }

        const mock = `（本地模拟）根据原题「${original}」和立意「${idea}」，生成示例内容：\n\n1. 立意要点：简要阐述立意的核心。\n2. 结构建议：提出可行的文章结构与段落安排。\n3. 示例段落：给出一段示例开头或论证段落，供参考。\n\n（若已接入后端，会显示真实 AI 返回内容）`;

        try {
            const resp = await fetch('/api/ai', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({original, idea})
            });

            if (!resp.ok) {
                // 后端未准备好，采用本地模拟
                if (resultBox) resultBox.value = mock;
                return;
            }

            const data = await resp.json();
            if (data && data.result) {
                if (resultBox) resultBox.value = data.result;
            } else {
                if (resultBox) resultBox.value = JSON.stringify(data, null, 2) || mock;
            }
        } catch (err) {
            // 网络或接口不可达时使用模拟结果
            if (resultBox) resultBox.value = mock;
        }
    });
});
