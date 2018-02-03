const puppeteer = require('puppeteer');

const appUrl = 'https://irfansimsar.github.io/es6-todo-app';
let page;
let browser;
const width = 800;
const height = 600;
const testTasks = [
	"Lorem ipsum",
	"do"
];

beforeAll(async () => {
	browser = await puppeteer.launch({
		args: [`--window-size=${width},${height}`]
	});
	page = await browser.newPage();
	await page.setViewport({ width, height });
	await page.goto(appUrl);
});

afterAll(() => {
	browser.close();
});

describe('Add new task', () => {
	test('user can add new task minimum 3 char', async () => {
		await page.waitForSelector('input[placeholder="please enter the task..."]');
		const inputElem = await page.$('input[placeholder="please enter the task..."]');
		const beforeTodoCount = await page.$$eval('.todos li', li => li.length);
		await inputElem.type(testTasks[0]);
		await inputElem.press('Enter');
		const afterTodoCount = await page.$$eval('.todos li', li => li.length);

    	expect(afterTodoCount).toBeGreaterThan(beforeTodoCount);
	});

	test('user can not add new task if character length less than 3', async () => {
		await page.waitForSelector('input[placeholder="please enter the task..."]');
		const inputElem = await page.$('input[placeholder="please enter the task..."]');
		const beforeTodoCount = await page.$$eval('.todos li', li => li.length);
		await inputElem.type(testTasks[1]);
		await inputElem.press('Enter');
		const afterTodoCount = await page.$$eval('.todos li', li => li.length);

    	expect(afterTodoCount).toBe(beforeTodoCount);
	});
});

describe('Mark a task as completed', () => {
	test('user can mark a task as completed', async () => {
		const btnDone = await page.$('.todos li .btn-done');
		await btnDone.click();
		const doneCount = await page.$$eval('.todos li.done', li => li.length);
		
    	expect(doneCount).toBe(1);
	});
});


describe('Delete a task', () => {
	test('user can delete a task', async () => {
		const btnDone = await page.$('.todos li .btn-delete');
		await btnDone.click();
		const afterTodoCount = await page.$$eval('.todos li', li => li.length);

    	expect(afterTodoCount).toBe(0);
	});
});
