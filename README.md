# SKIDIY 官網改版｜UX 期中報告

長滾動式 Case Study 網站，記錄 SKIDIY 官網改版的研究、資訊架構與設計方案。

## 開發

```bash
npm install
npm run dev
```

## 建置

| 指令 | 用途 | 講者備註 |
| --- | --- | --- |
| `npm run build` | 交作業、公開部署 | **不包含**（檔案完全不會被打包進去） |
| `npm run build:presenter` | 自己上台報告用 | 包含，右上角出現「切換為報告模式」 |

備註存放在 `src/data/presenterNotes.js`，只有在 `VITE_PRESENTER=1` 的建置中才會載入。
`npm run dev` 預設開啟（見 `.env.development`）。

## 部署

推送到 `main` 分支會自動觸發 GitHub Actions 建置並發布到 GitHub Pages，
使用的是 `npm run build`，所以公開網站不會包含講者備註。
