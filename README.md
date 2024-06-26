# Web Automation Project: Product Price Scraper

## Introduction
The Web Automation Project is designed to automate the process of fetching product prices from websites and saving them to a local API. This documentation provides an overview of the project, its objectives, and the technologies used.

### Objective
The primary objective of this project is to fetch product prices from various websites automatically and store them in a local API. This automation streamlines the process of collecting price data, enabling efficient monitoring and analysis.

## Technologies Used
The project utilizes the following technologies:
- **Puppeteer**: A Node.js library for controlling headless Chrome and automating web browser interactions.
- **Node.js**: A JavaScript runtime environment for executing server-side code.
- **Redis**: An open-source, in-memory data structure store used as a database, cache, and message broker.
- **BullMQ**: A Node.js job queue library for handling distributed task queues.

## Installation and Setup
To set up the project, follow these steps:
1. Clone the repository from GitHub.
   ```bash
   git clone https://github.com/abdullahmiraz/web-automation-scraping-puppeteer.git
   ```
2. Install dependencies.
   ```bash
   cd web-automation-scraping-puppeteer
   npm install
   ```
3. Configure environment variables using the `.env` file.

## Package.json Details
```json
{
  "dependencies": {
    "bullmq": "^4.11.4",
    "dotenv": "^16.3.1",
    "lowdb": "^6.0.1",
    "multiformats": "^9.9.0",
    "puppeteer": "^21.3.4"
  },
  "name": "2-ecommerce-crawler",
  "description": "Web automation project for fetching product prices and saving them to a local API.",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## Screenshots
### Category View
[![Category MJ's View](https://i.ibb.co/yphpsyN/category-mjs-viee.png)](https://i.ibb.co/yphpsyN/category-mjs-viee.png)

### Product Data Display
![Product Data Display](https://i.ibb.co/YcyT109/product-mjs-file-showing.png)

### Running the Product Scraper
![Running the Product Scraper](https://i.ibb.co/821jFkK/product-mjs-running.png)

## Conclusion
The Web Automation Project simplifies the process of collecting and managing product price data from websites. By leveraging Puppeteer and Node.js, it automates web scraping tasks, enabling efficient data retrieval and storage. With the ability to fetch and store product prices locally, this project offers valuable insights for monitoring pricing trends and making informed business decisions.
