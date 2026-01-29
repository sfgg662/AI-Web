// @ts-check
// 简单的平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 直接使用 anchor，不依赖 this
        const href = anchor.getAttribute('href');
        
        if (href) {
            document.querySelector(href)?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

console.log("AI 写作助手已加载");
let str = "abc";
console.log(str);

let person = {
    firstName : "Harry",
    lastName : "Potter",
    id : 114514,
    getFirstName(){ return this.firstName; },
    getLastName(){ return this.lastName; },
    getFullName(){ return this.getFirstName() + " " + this.getLastName(); }
};

const PI = 3.1415926;

console.log(person.getFullName());

function jump(){
    console.log("点击审题立意");
}