# Character Editor Releases

Character Editor 的公开发行仓库，承载官网下载页与隐私说明。

目前提供 Windows x64 安装程序和 Android ARM64 APK。应用内的软件更新页面也提供官网、版本历史及双平台直接下载入口。

两端版本可以不一致：v1.6.1 只发布了 Windows，Android 仍是 v1.6.0（换签名后无法覆盖安装，而卸载会清空数据，在补上完整数据导出前不推送移动端更新）。

- 官网：https://torinaviolet.github.io/CharacterEditor-Releases/
- 下载：https://pub-574cb9a14cd54d07bf69c82e02931fa3.r2.dev/

应用源码在私有仓库维护。本仓库不包含用户数据、API Key 或更新签名私钥。

## 安装包托管在 R2，不在本仓库的 Releases

发行文件与更新清单都发布到 Cloudflare R2，本仓库的 GitHub Releases **只保留历史版本，不再更新**。
页面上的下载按钮直接指向 R2 的固定文件名，因此始终是最新版：

- `CharacterEditor-Windows-x64-setup.exe`
- `CharacterEditor-Android-arm64.apk`
- `latest.json` / `latest-mobile.json`（应用内更新检查用）

根目录的 `latest-mobile.json` 是迁移到 R2 之前的遗留文件，当前版本的应用不再读取它。

## 发布新版本时要改这里的什么

页面上的版本号是写死的静态文本，不会自动跟随 R2。原因是 r2.dev 没有对本站点开放跨域，
页面无法直接读取 `latest.json`（实测 `Failed to fetch`）。这是有意的取舍：

- 下载链接用固定文件名，**永远不会过期**，即使版本号文字忘了改也不会把旧包给用户；
- 需要人工更新的只有版本号文字，代价仅仅是显示滞后。

因此每次发布后需要改：

1. `index.html` 里出现的版本号（搜索上一个版本号即可，通常 4 处）
2. `#changelog` 段落换成本次的更新内容
3. 如果本次不需要手动安装，删掉顶部横幅与 `#upgrade` 段落，并把 FAQ 里相应的几条改回常规说明
4. **只发单端时，另一端的版本号标签必须保持旧版本**。下载按钮的文件名固定，标错版本号会让用户以为下到了新版。发布脚本的 `--windows-only` 同样不会上传 `latest-mobile.json`，移动端清单停在旧版本，安卓用户不会收到更新提示

若希望改成自动读取，需要在 Cloudflare 的 R2 桶上为 `https://torinaviolet.github.io` 配置 CORS 允许 GET，
之后页面就可以直接 fetch `latest.json` 渲染版本号。
