<div align="center">

  ![Move.it][logo] ![Version][version-2-shield]

  ![Languages][languages-shield]
  ![License][license-shield]
  ![App version][version-shield]
  ![Bootcamp][nlw-shield]

  **The best way to be productive and healthy. Both at the same time.**

  ![Move.it mockup][demonstration]

  **[▶ Demonstration][move-it-url]**

  [Move.it 1.0 →][version-1-repo-url]

</div>

# 📚 About
Moveit is a pomodoro based app that help you to stay healthy during working time being totally productive.

With this app, you are able to work between "25 minutes" periods, and the gain experience and levels, like a game.

**This project can offers productivity, health and fun, all at the same time! 😋**

## 🛠 Build with

- [x] [React.js][reactjs]
- [x] [Next.js][nextjs]

## 📑 Features

- [x] Countdown for 25 minutes sessions (like pomodoro principles)
- [x] Improve your levels based on your current experience
- [x] Gain experience with each completed challenge
- [x] Unlock a different challenge each time the countdown finishes
- [x] Notification to alert about a new challenge

# 💡 What I learned

- [x] Use Context API from React.js
- [x] Define and implement font-size focused on acessibility
- [x] Concepts and use of Next.js framework
- [x] Use Notification API at Browser
- [x] Use Audio API at Browser
- [x] Upload a Next.js app into the web
- [x] Concepts related to SEO
- [x] Quick implement a MongoDB connection
- [x] Next.js Rest API routing

# 🔥 Getting started

## ⚙ Prerequisites
To run this project you must have [Node.js][nodejs] installed in your machine.

The [Yarn][yarnjs] package manager is optional. Based on the NPM, it is a bit different at some factors, improving some issues that NPM would have. But, if you desire, can use NPM without doubt, currently they are practically worth.

## ⚡ Setup

### Database connection (MongoDB)

Create a `.env` file at project root directory and insert the code below:
```env
MONGOBD_URI=<yourMongoDBConnectionURL>
```
To fill `MONGODB_URI`, create an account into MongoBD Atlas, then create a database with name you desire and use `connection URI` offered by the site to connect with your client.

For more informations about the steps, access [MongoDB Documentation](https://docs.mongodb.com/).

### Run website

**Node (NPM)**
```
npm install

npm run dev
```
**Yarn**
```
yarn

yarn dev
```

# 🤟🏼 Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

1. 🍴 Fork the Project
2. 👯 Clone this project (`git clone https://github.com/cristianprochnow/move-it.git`)
3. 🔀 Create your Feature Branch (`git checkout -b my-feature`)
4. ✔️ Commit your Changes (`git commit -m 'feat: My new feature'`)
5. 📌 Push to the Branch (`git push origin my-feature`)
6. 🔁 Open a Pull Request

# 📞 Contact
[![LinkedIn][linkedin-shield]][linkedin-url]

# 📜 License
This project is under **MIT License**. Check `LICENSE` for more details.

[logo]: ./public/logo-full.svg
[move-it-url]: https://move-it-now-better.vercel.app/
[languages-shield]: https://shields.io/github/languages/count/cristianprochnow/move-it?style=flat&color=5965E0
[license-shield]: https://shields.io/github/license/cristianprochnow/move-it?style=flat&color=5965E0
[nlw-shield]: https://img.shields.io/static/v1?label=next%20level%20week&message=4&color=5965E0
[version-shield]: https://img.shields.io/static/v1?label=version&message=2&color=4CD62B
[reactjs]: https://reactjs.org/
[nextjs]: https://nextjs.org/
[nodejs]: https://nodejs.org/
[yarnjs]: https://yarnpkg.com/
[linkedin-shield]: https://img.shields.io/badge/-Cristian_Prochnow-black.svg?e&logo=linkedin&colorB=0077b4
[linkedin-url]: https://www.linkedin.com/in/cristianprochnow
[demonstration]: ./.github/app.gif
[version-1-repo-url]: https://github.com/cristianprochnow/move-it/tree/nextjs
[version-2-shield]: https://img.shields.io/badge/-2.0-5965E0
