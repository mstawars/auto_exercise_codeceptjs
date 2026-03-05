# Automated UI Testing Framework

**CodeceptJS + Playwright + TypeScript + Allure Reports**

# Installation & Setup

Follow these steps to install and run the project locally.

---

## 1 Requirements

Ensure the following tools are installed on your machine:

- **Node.js 20+**
  ```bash
  node -v
  ```
- **npm**
  ```bash
  npm -v
  ```
- **Git**
  ```bash
  git --version
  ```

---

## 2 Clone the Repository

```bash
git clone https://github.com/mstawars/auto_exercise_codeceptjs.git
cd auto_exercise_codeceptjs
```

---

## 3 Install Dependencies

```bash
npm ci
```

---

## 4 Install Playwright Browsers

```bash
npx playwright install --with-deps
```

---

# 5 Running Tests

### Run all tests (headless):

```bash
npm run test
```

All logs, screenshots and Allure results will appear in:

```
output/
```

---

# 6 Allure Reports

After test execution, raw Allure results are created in:

```
output/allure-results/
```

### Generate an HTML report locally:

```bash
npx allure generate output/allure-results --clean -o allure-report
```

### Open the report:

```bash
npx allure open allure-report
```

---

# 🗂 Project Structure

```
.
├── codecept.conf.ts          # Main CodeceptJS configuration
├── tests/                    # Test scenarios
├── pages/                    # Page Objects (POM)
├── step_definitions/         # BDD Step definitions
├── output/                   # Logs, screenshots, allure results
├── allure-report/            # HTML report (generated locally)
├── package.json
└── tsconfig.json
```

---

# Continuous Integration (GitHub Actions)

The repository includes a CI pipeline that:

1. Installs dependencies
2. Installs Playwright browsers
3. Runs CodeceptJS tests
4. Uploads test artifacts (screenshots, logs, Allure results)
5. Generates an Allure HTML report
6. (Optional) Publishes the report to **GitHub Pages**

# GitHub Pages Deployment

The CI publishes the Allure report to GitHub Pages.

The URL can be found under:

```
Actions → [workflow run] → Deployments → github-pages
```
