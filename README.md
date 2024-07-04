<h3 align="center">
	<img src="https://raw.githubusercontent.com/Bikram-ghuku/ChatSyncWeb/main/public/icon.png" width="100" alt="Logo"/><br/>
	<img src="" alt="" height="30" width="0px"/>
	Sync Chat
	<img src="" alt="" height="30" width="0px"/>
</h3>

<h6 align="center">
  <a href="#-features">Features</a>
  ·
  <a href="#-downloads">Downloads</a>
  ·
  <a href="#-building-from-source">Building from Source</a>
  ·
  <a href="#-setting-up">Setting Up</a>
  ·
  <a href="#-faqs">FAQs</a>
</h6>

<p align="center">
	<a href="https://github.com/Bikram-ghuku/SyncChatServer/stargazers">
		<img alt="Stargazers" src="https://img.shields.io/github/stars/Bikram-ghuku/SyncChatServer?style=for-the-badge&logo=starship&color=C9CBFF&logoColor=D9E0EE&labelColor=302D41"></a>
	<a href="https://github.com/Bikram-ghuku/ChatSyncWeb/releases/latest">
		<img alt="Releases" src="https://img.shields.io/github/release/Bikram-ghuku/SyncChatServer.svg?style=for-the-badge&logo=github&color=F2CDCD&logoColor=D9E0EE&labelColor=302D41"/></a>
	<a href="#-downloads">
		<img alt="Downloads" src="https://img.shields.io/github/downloads/Bikram-ghuku/SyncChatServer/total?style=for-the-badge&color=B5E8E0&logoColor=D9E0EE&labelColor=302D41"></a>
</p>

<p align="center">
  Sync Chat is an open-source realtime chat application for one-to-one communications. It is built using nextjs 14. It has responsive design to support mostly all platforms. It uses AES encryption. It stores messages in a Database to provide chat histroy.
</p>

&nbsp;

### ✨ Features

- AES Encryption
- Chat history
- one-to-one
- Realtime

### 🔧 Building from Source

The client can also be built from source for individual platforms.

#### Prerequisites

- [Git CLI](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop/)

#### Building

1. Clone the repository and cd into it.

	```shell
	    git clone https://github.com/Bikram-ghuku/SyncChatServer.git
	    cd ChatSyncWeb
	```

2. Install required modules

	```shell
	    npm i
	```

3. Setup Docker for PostgreSQL server
	```shell
	  docker compose up
	```

4. Run the development server

	```shell
	    npm run dev
	```

5. Setup the envrionment

    - Rename the .env.example to .env
    - Set `DATABASE_URL = "postgresql://username:password@localhost:5432/database?schema=public"` if using docker PostgresSQL
    - Fill the required tokens

Visit the application at: http://localhost:8080/

6. Setup the database
   ```shell
   npx prisma migrate deploy
   ```

&nbsp;

### 📜 License

<a href="https://github.com/Bikram-ghuku/ChatSyncWeb/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Bikram-ghuku/SyncChatServer?style=for-the-badge&labelColor=302D41&color=C9CBFF"/></a>

SyncChat is released under the MIT license, which grants the following permissions:

- Commercial use
- Distribution
- Modification
- Private use

For more convoluted language, see the [LICENSE](https://github.com/Bikram-ghuku/SyncChatServer/blob/main/LICENSE).

&nbsp;
