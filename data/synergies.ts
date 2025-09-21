import type { Synergy } from "../types";

export const SYNERGIES: Synergy[] = [
    {
        id: 'summer_freshness',
        name: '夏のさわやかさ',
        icon: 'fa-umbrella-beach',
        requirements: [
            { businessId: 'lemonade', level: 10 },
            { businessId: 'general_store', level: 10 },
        ],
        bonuses: [
            { businessId: 'lemonade', multiplier: 1.15 }, // +15%
            { businessId: 'general_store', multiplier: 1.15 }, // +15%
        ],
        description: 'レモネードと雑貨が夏の思い出を彩る！'
    },
    {
        id: 'digital_duo',
        name: 'デジタルデュオ',
        icon: 'fa-users-line',
        requirements: [
            { businessId: 'blog', level: 25 },
            { businessId: 'app', level: 25 },
        ],
        bonuses: [
            { businessId: 'blog', multiplier: 1.20 }, // +20%
            { businessId: 'app', multiplier: 1.20 }, // +20%
        ],
        description: 'ブログとアプリの連携でオンライン帝国を築く！'
    },
    {
        id: 'cosmic_pioneers',
        name: '宇宙の開拓者',
        icon: 'fa-meteor',
        requirements: [
            { businessId: 'rocket', level: 10 },
            { businessId: 'moon_resort', level: 5 },
        ],
        bonuses: [
            { businessId: 'rocket', multiplier: 1.25 }, // +25%
            { businessId: 'moon_resort', multiplier: 1.25 }, // +25%
        ],
        description: 'ロケットで月へ！宇宙観光の夢が加速する。'
    },
    {
        id: 'future_visionaries',
        name: '未来の創造主',
        icon: 'fa-ruler-combined',
        requirements: [
            { businessId: 'time_travel', level: 10 },
            { businessId: 'reality_studio', level: 5 },
        ],
        bonuses: [
            { businessId: 'time_travel', multiplier: 1.50 }, // +50%
            { businessId: 'reality_studio', multiplier: 1.50 }, // +50%
        ],
        description: '時を超え、現実を創造する究極の組み合わせ。'
    }
];