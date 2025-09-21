
import type { Manager } from '../types';

export const HIRE_COST = 20; // in Idea Sparks

export const MANAGERS: Omit<Manager, 'level'>[] = [
    {
        id: 'manager_lemon',
        name: 'リナ',
        description: 'さわやかな笑顔でレモネードを売るのが得意。',
        businessId: 'lemonade',
        bonusMultiplier: 1.25, // +25%
        icon: 'fa-seedling',
        baseLevelUpCost: 5,
        costMultiplier: 1.8,
    },
    {
        id: 'manager_cookie',
        name: 'パティ',
        description: '伝説のパティシエ。クッキー作りは宇宙一。',
        businessId: 'cookie',
        bonusMultiplier: 1.25, // +25%
        icon: 'fa-birthday-cake',
        baseLevelUpCost: 8,
        costMultiplier: 1.8,
    },
    {
        id: 'manager_blog',
        name: 'ケンジ',
        description: '言葉の魔術師。彼の書く記事は必ずバズる。',
        businessId: 'blog',
        bonusMultiplier: 1.20, // +20%
        icon: 'fa-feather-alt',
        baseLevelUpCost: 10,
        costMultiplier: 1.9,
    },
    {
        id: 'manager_store',
        name: 'ミキ',
        description: 'カリスマ店員。彼女が選ぶ商品はなんでも売れる。',
        businessId: 'general_store',
        bonusMultiplier: 1.20, // +20%
        icon: 'fa-shopping-bag',
        baseLevelUpCost: 12,
        costMultiplier: 1.9,
    },
    {
        id: 'manager_app',
        name: 'ハッカー',
        description: '天才プログラマー。彼のコードは芸術品。',
        businessId: 'app',
        bonusMultiplier: 1.15, // +15%
        icon: 'fa-laptop-code',
        baseLevelUpCost: 15,
        costMultiplier: 2.0,
    },
    {
        id: 'manager_saas',
        name: 'CEO',
        description: 'ビジネスの天才。彼の戦略に隙はない。',
        businessId: 'saas',
        bonusMultiplier: 1.15, // +15%
        icon: 'fa-user-tie',
        baseLevelUpCost: 20,
        costMultiplier: 2.0,
    },
    {
        id: 'manager_ai_cafe',
        name: 'アイ',
        description: 'AIと心を通わせることができる少女。',
        businessId: 'ai_cafe',
        bonusMultiplier: 1.10, // +10%
        icon: 'fa-heart',
        baseLevelUpCost: 25,
        costMultiplier: 2.1,
    },
    {
        id: 'manager_rocket',
        name: 'キャプテン',
        description: '伝説の宇宙飛行士。彼の操縦で失敗はない。',
        businessId: 'rocket',
        bonusMultiplier: 1.10, // +10%
        icon: 'fa-star',
        baseLevelUpCost: 30,
        costMultiplier: 2.1,
    },
    {
        id: 'manager_moon_resort',
        name: 'セレナ',
        description: '月の静寂を愛する、伝説のコンシェルジュ。',
        businessId: 'moon_resort',
        bonusMultiplier: 1.10,
        icon: 'fa-satellite',
        baseLevelUpCost: 35,
        costMultiplier: 2.2,
    },
    {
        id: 'manager_time_travel',
        name: 'クロノス',
        description: '時間の流れを熟知した、謎多きガイド。',
        businessId: 'time_travel',
        bonusMultiplier: 1.10,
        icon: 'fa-user-clock',
        baseLevelUpCost: 40,
        costMultiplier: 2.2,
    }
];
