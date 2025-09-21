
import type { Achievement, Business, Manager } from '../types';

const hasBusinessLevel = (businesses: Business[], id: string, level: number): boolean => {
  return (businesses.find(b => b.id === id)?.level ?? 0) >= level;
};

export const INITIAL_ACHIEVEMENTS: Omit<Achievement, 'isUnlocked'>[] = [
  // Money Milestones
  { 
    id: 'money1', 
    title: 'はじめの一歩', 
    description: '初めて1,000円稼いだ！', 
    icon: 'fa-sack-dollar',
    category: 'Money & Income',
    check: stats => stats.totalMoneyEarned >= 1000 
  },
  { 
    id: 'money2', 
    title: '小さな資本家', 
    description: '合計で100,000円稼いだ。', 
    icon: 'fa-sack-dollar',
    category: 'Money & Income',
    check: stats => stats.totalMoneyEarned >= 100000 
  },
  { 
    id: 'money3', 
    title: 'ミリオネアへの道', 
    description: '合計で1,000,000円稼いだ！すごい！', 
    icon: 'fa-sack-dollar',
    category: 'Money & Income',
    check: stats => stats.totalMoneyEarned >= 1000000 
  },
  
  // Income Milestones
  { 
    id: 'income1', 
    title: '不労所得の始まり', 
    description: '秒間収益が100円に到達した。', 
    icon: 'fa-coins',
    category: 'Money & Income',
    check: stats => stats.incomePerSecond >= 100 
  },
  { 
    id: 'income_1000', 
    title: '安定収入', 
    description: '秒間収益が1,000円に到達しました！', 
    icon: 'fa-coins',
    category: 'Money & Income',
    check: stats => stats.incomePerSecond >= 1000 
  },
  { 
    id: 'income2', 
    title: 'ビジネスの加速', 
    description: '秒間収益が10,000円に到達した。', 
    icon: 'fa-coins',
    category: 'Money & Income',
    check: stats => stats.incomePerSecond >= 10000 
  },
  { 
    id: 'income_100k', 
    title: '経済エンジン', 
    description: '秒間収益が100,000円を突破！', 
    icon: 'fa-coins',
    category: 'Money & Income',
    check: stats => stats.incomePerSecond >= 100000
  },
  { 
    id: 'income_1m', 
    title: '億万長者メーカー', 
    description: '秒間収益が1,000,000円に到達！', 
    icon: 'fa-coins',
    category: 'Money & Income',
    check: stats => stats.incomePerSecond >= 1000000
  },
  { 
    id: 'income_10m', 
    title: 'キャッシュの神様', 
    description: '秒間収益が10,000,000円に到達！もはや伝説。', 
    icon: 'fa-coins',
    category: 'Money & Income',
    check: stats => stats.incomePerSecond >= 10000000
  },

  // Business Level Milestones
  { 
    id: 'biz_lemonade_10', 
    title: 'レモンのプロ', 
    description: 'レモネードスタンドがレベル10に到達した。', 
    icon: 'fa-briefcase',
    category: 'Business',
    check: stats => hasBusinessLevel(stats.businesses, 'lemonade', 10)
  },
  { 
    id: 'biz_blog_10', 
    title: '人気ブロガー', 
    description: '個人ブログがレベル10に到達した。', 
    icon: 'fa-briefcase',
    category: 'Business',
    check: stats => hasBusinessLevel(stats.businesses, 'blog', 10)
  },
  { 
    id: 'biz_app_25', 
    title: 'アプリの達人', 
    description: 'モバイルアプリがレベル25に到達した。', 
    icon: 'fa-briefcase',
    category: 'Business',
    check: stats => hasBusinessLevel(stats.businesses, 'app', 25)
  },
  { 
    id: 'biz_saas_1', 
    title: 'SaaSスタート！', 
    description: 'SaaSプラットフォームを初めて購入した。', 
    icon: 'fa-briefcase',
    category: 'Business',
    check: stats => hasBusinessLevel(stats.businesses, 'saas', 1)
  },
  { 
    id: 'biz_moon_resort_1', 
    title: '月のオーナー', 
    description: '月面リゾート開発を始めた！', 
    icon: 'fa-briefcase',
    category: 'Business',
    check: stats => hasBusinessLevel(stats.businesses, 'moon_resort', 1)
  },
  { 
    id: 'biz_interdimensional_market_1', 
    title: '異次元の商人', 
    description: '次元間マーケットプレイスを開設した。', 
    icon: 'fa-briefcase',
    category: 'Business',
    check: stats => hasBusinessLevel(stats.businesses, 'interdimensional_market', 1)
  },
  { 
    id: 'biz_consciousness_upload_1', 
    title: '意識の超越者', 
    description: '宇宙意識アップロード事業を開始した。', 
    icon: 'fa-briefcase',
    category: 'Business',
    check: stats => hasBusinessLevel(stats.businesses, 'consciousness_upload', 1)
  },

  // Synergy Milestones
  { 
    id: 'synergy_summer_freshness', 
    title: '夏の思い出', 
    description: 'レモネードと雑貨屋さんが合わさり、最高の夏の思い出が生まれた。', 
    icon: 'fa-umbrella-beach',
    category: 'Synergy',
    check: stats => hasBusinessLevel(stats.businesses, 'lemonade', 10) && hasBusinessLevel(stats.businesses, 'general_store', 10)
  },
  { 
    id: 'synergy_digital_duo', 
    title: '連携クリエイター', 
    description: 'オンラインでの協力の力で、新たな価値を生み出した。', 
    icon: 'fa-users-line',
    category: 'Synergy',
    check: stats => hasBusinessLevel(stats.businesses, 'blog', 25) && hasBusinessLevel(stats.businesses, 'app', 25)
  },
  { 
    id: 'synergy_cosmic_pioneers', 
    title: '宇宙の開拓者たち', 
    description: 'ロケットとリゾートで、宇宙への道を切り開いた。', 
    icon: 'fa-meteor',
    category: 'Synergy',
    check: stats => hasBusinessLevel(stats.businesses, 'rocket', 10) && hasBusinessLevel(stats.businesses, 'moon_resort', 5)
  },
  { 
    id: 'synergy_future_visionaries', 
    title: '時空の建築家', 
    description: '時間と現実を操り、未来のビジョンを形にした。', 
    icon: 'fa-ruler-combined',
    category: 'Synergy',
    check: stats => hasBusinessLevel(stats.businesses, 'time_travel', 10) && hasBusinessLevel(stats.businesses, 'reality_studio', 5)
  },

  // Roadmap Milestones
  {
    id: 'roadmap_first_purchase',
    title: '未来への投資',
    description: '未来への第一歩。長期的な計画が会社の礎となる。',
    icon: 'fa-map-signs',
    category: 'Roadmap',
    check: stats => stats.purchasedUpgrades.length >= 1,
  },
  {
    id: 'roadmap_third_purchase',
    title: '戦略の達人',
    description: 'あなたの戦略眼は本物！会社の未来は明るい。',
    icon: 'fa-map-signs',
    category: 'Roadmap',
    check: stats => stats.purchasedUpgrades.length >= 3,
  },

  // Feature Engagement
  { 
    id: 'feature_advisor_1', 
    title: '初めてのアドバイス', 
    description: 'AIともだちから初めてアドバイスをもらった。', 
    icon: 'fa-hand-holding-heart',
    category: 'Game Features',
    check: stats => stats.advisorRequests >= 1
  },
  { 
    id: 'feature_event_1', 
    title: '運命の分かれ道', 
    description: '初めてのハプニングで決断を下した。', 
    icon: 'fa-code-fork',
    category: 'Game Features',
    check: stats => stats.eventsHandled >= 1
  },
  { 
    id: 'feature_manager_1', 
    title: '最初の仲間', 
    description: '初めてマネージャーを雇った。', 
    icon: 'fa-user-plus',
    category: 'Game Features',
    check: stats => stats.hiredManagers.length >= 1
  },
];
