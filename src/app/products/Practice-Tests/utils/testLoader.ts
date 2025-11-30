import { Category, Test } from './types';
import { categories } from '../data/categories';
import { algorithmTests } from '../data/technical/algorithms';
import { systemDesignTests } from '../data/technical/system-design';
import { leadershipTests } from '../data/behavioral/leadership';
import { nonTechnicalTests } from '../data/non-technical';

export class TestLoader {
  private static instance: TestLoader;
  private categories: Category[] = [];
  private tests: Test[] = [];

  private constructor() {
    // Load categories
    this.categories = categories;

    // Load all tests
    this.tests = [
      ...algorithmTests,
      ...systemDesignTests,
      ...leadershipTests,
      ...nonTechnicalTests
    ];
  }

  public static getInstance(): TestLoader {
    if (!TestLoader.instance) {
      TestLoader.instance = new TestLoader();
    }
    return TestLoader.instance;
  }

  public async getCategories(): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return this.categories;
  }

  public async getAllTests(): Promise<Test[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return this.tests;
  }

  public async loadTestsForCategory(categoryId: string, subcategoryId: string): Promise<{ tests: Test[] } | null> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const filteredTests = this.tests.filter(
      test => test.category === categoryId && test.subcategory === subcategoryId
    );
    return { tests: filteredTests };
  }
}