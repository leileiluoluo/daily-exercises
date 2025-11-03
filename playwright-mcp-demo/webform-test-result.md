# Web Form 测试报告

## 测试步骤与结果

1. 打开 WebForm 地址后，验证网页的标题为「Web form」：
   - 结果：成功，网页标题为「Web form」。
2. 在 Text input 输入框输入「Playwright MCP Test」：
   - 结果：成功，已正确输入。
3. 在 Password 输入框输入「Playwright」：
   - 结果：成功，已正确输入。
4. 在 Dropdown (select) 输入框选择「Two」：
   - 结果：成功，已正确选择「Two」。
5. 在 File input 输入框，点击选择文件，并选定当前工程根目录下的文件 `file.txt`：
   - 结果：成功，已正确上传文件。
6. 在 Date picker 输入框，输入当前日期「11/03/2025」：
   - 结果：成功，已正确输入。
7. 点击 Submit 按钮，确认页面返回「Form submitted」后关闭浏览器：
   - 结果：成功，页面返回「Form submitted」。

---

## 截屏

![Form submitted 页面截屏](./.playwright-mcp/webform-test-success.png)
