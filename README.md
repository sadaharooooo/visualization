# SuperUltimate AI 운영본부

이 폴더는 지금까지 구축한 데이터/마케팅 자동화 작업을 정리한 정적 홈페이지입니다.
`index.html`, `styles.css`, `app.js`만 있으면 브라우저에서 열 수 있고 별도 빌드가 필요 없습니다.

## 로컬에서 보기

브라우저로 `index.html`을 직접 열거나, 로컬 서버로 확인할 수 있습니다.

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

그 다음 `http://127.0.0.1:8765/index.html`에 접속합니다.

## 퍼블리싱 가능 여부

가능합니다. 정적 사이트라서 아래 서비스에 그대로 배포할 수 있습니다.

- GitHub Pages: 이 폴더를 GitHub 저장소에 올리고 Pages source를 root로 선택합니다.
- Netlify: 이 폴더를 드래그 앤 드롭하거나 Git 저장소와 연결합니다. `netlify.toml`이 publish root를 지정합니다.
- Vercel: 새 프로젝트로 import하고 Framework Preset을 Other로 둔 뒤 root를 배포합니다.
- Cloudflare Pages: Git 저장소 연결 후 build command 없이 root를 배포합니다.

## 배포 전 확인

```powershell
C:\Users\dmsdl\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe tests\homepage.test.js
```

테스트는 필수 콘텐츠, Discord 디자인 토큰, 배포 안내, secret 비노출을 확인합니다.

## 주의

이 사이트에는 API key, token, secret 값을 넣지 않습니다. 자동화와 API는 이름과 용도만 표시합니다.
