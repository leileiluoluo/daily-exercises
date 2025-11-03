# 使用 Playwright MCP 测试 Web Form 的测试用例

该测试用例包含用例描述、测试步骤和报告生成三部分。请仔细阅读前两部分来分别了解该用例的测试场景、具体的测试步骤。最后在当前文件夹生成一个测试报告，报告要包含的内容请参阅第三部分 —— 报告生成。

## 1 用例描述

这是一个测试 Web Form 的场景，用于验证 Web Form 的各个组件是否能够正常使用。您需要在浏览器打开如下 WebForm 地址，然后根据第二步提供的测试步骤进行详细测试和验证。

- WebForm 地址

https://www.selenium.dev/selenium/web/web-form.html

## 2 测试步骤

具体的测试步骤如下：

1. 打开 WebForm 地址后，验证网页的标题为「Web form」；
2. 在 Text input 输入框输入「Playwright MCP Test」；
3. 在 Password 输入框输入「Playwright」；
4. 在 Dropdown (select) 输入框选择「Two」；
5. 在 File input 输入框，点击选择文件，并选定当前工程根目录下的文件 `file.txt`；
6. 在 Date picker 输入框，输入当前日期「11/03/2025」；
7. 点击 Submit 按钮，确认页面返回「Form submitted」后关闭浏览器。

## 3 报告生成

您需要在当前文件夹下生成一个测试报告，文件名为 `webform-test-result.md`，格式为 Markdown。需要详细记录每个步骤的测试结果，展示对应步骤成功还是失败，失败的话，要给出失败的原因。若每个测试步骤均执行成功，请将最后一步「Form submitted」返回后的页面进行截屏并附加到测试报告中。
