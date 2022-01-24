## 网站自定义主题色
基于vue2以及Element场景，不需要提前预设主题色，把五彩斑斓的黑由用户自己定义。

## 最终效果
vue后台管理star11.3k的项目 [https://github.com/chuzhixin/vue-admin-better](https://github.com/chuzhixin/vue-admin-better)，

第一步：引入包`yarn add custom-themes`

第二步：直接调用实现任意主题的切换。

因此只需要把 ColorPicker 颜色选择器🎨给到用户就好。

```bash
import { changePrimaryTheme } from 'custom-themes'
/** 调用
 * '#E81414': 第一个参数为选中的主题色
 * '#41b584': 第二个参数为当前的主题色，一般为sass变量定义
 */
changePrimaryTheme('#E81414', '#41b584')
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1643025284069-30c4a607-8cbb-4ded-9fde-9fe54d71d2a8.png#clientId=uc843ab46-01fc-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=256&id=u7bc49fad&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1024&originWidth=1386&originalType=binary&ratio=1&rotation=0&showTitle=false&size=180758&status=done&style=none&taskId=u32c3a760-3682-46b3-9cd4-8b2742dc70a&title=&width=347)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1642922349750-4ac6d312-18e9-4602-aea4-3811a5c40e98.png#clientId=u0ac73f05-11fa-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=373&id=u3364568a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1492&originWidth=2852&originalType=binary&ratio=1&rotation=0&showTitle=false&size=438764&status=done&style=none&taskId=u41c514f7-0b9c-400f-b05e-46644f10b25&title=&width=713)

其他场景也可以用此思路做尝试~