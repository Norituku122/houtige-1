import type { InteractiveEvent } from "../types";

export const INTERACTIVE_EVENTS: InteractiveEvent[] = [
    {
        minIncomeRequired: 0,
        description: "あなたのレモネードスタンドに、有名なフードブロガーが偶然立ち寄った！絶賛のレビューを書いてくれるかもしれない…！",
        options: [
            {
                text: "特別なハチミツを使ったプレミアムレモネードをプレゼントする",
                resultText: "ブロガーは大感激！記事がバズって、レモネードスタンドの収益が永久にアップした！",
                effects: [{ type: 'income_multiplier', businessId: 'lemonade', multiplier: 1.2 }]
            },
            {
                text: "いつも通りの最高のレモネードを自信を持って提供する",
                resultText: "「安定した美味しさ」と評価された！一攫千金ではないけど、確実なファンがついたみたい。",
                effects: [{ type: 'money', amount: 5000 }]
            }
        ]
    },
    {
        minIncomeRequired: 1000,
        description: "あなたのモバイルアプリが、突然SNSで話題に！サーバーのアクセスが急増している！",
        options: [
            {
                text: "追加費用を払って、緊急でサーバーを増強する",
                resultText: "サーバーはダウンを免れ、ユーザーの信頼を獲得！アプリの収益が大きく伸びた！",
                effects: [
                    { type: 'money', amount: -20000 },
                    { type: 'income_multiplier', businessId: 'app', multiplier: 1.5 }
                ]
            },
            {
                text: "このまま乗り切れることを祈る",
                resultText: "残念、サーバーが一時的にダウン…機会損失はあったけど、コストはかからなかった。",
                effects: [{ type: 'income_multiplier', businessId: 'app', multiplier: 0.9 }]
            }
        ]
    },
    {
        minIncomeRequired: 0,
        description: "地元のフェスティバルで、手作りクッキー屋さんの出店依頼が来た！絶好のチャンスだけど、準備が大変そう…。",
        options: [
            {
                text: "徹夜してでも、最高のクッキーを用意して出店する！",
                resultText: "あなたのクッキーはフェスティバルで大人気！評判が広まり、お店の基本収益がアップした！",
                effects: [{ type: 'income_multiplier', businessId: 'cookie', multiplier: 1.3 }]
            },
            {
                text: "今回は見送って、お店の通常営業に集中する",
                resultText: "無理は禁物だよね。お店はいつも通り平和で、固定ファンが喜んでくれた。",
                effects: [{ type: 'money', amount: 2500 }]
            }
        ]
    },
    {
        minIncomeRequired: 100000,
        description: "SaaSプラットフォームの競合が、あなたの顧客を引き抜くために大規模なキャンペーンを始めた！対抗するには莫大な広告費がかかる…",
        options: [
            {
                text: "会社の資金を注ぎ込み、対抗キャンペーンを打つ！",
                resultText: "あなたのキャンペーンは大成功！顧客を守り抜き、競合のシェアを奪った！SaaS事業はより強固になった。",
                effects: [
                    { type: 'money', amount: -500000 },
                    { type: 'income_multiplier', businessId: 'saas', multiplier: 1.5 }
                ]
            },
            {
                text: "製品の質で勝負する。キャンペーンは無視する",
                resultText: "残念ながら、一部の顧客が競合に移ってしまった…コストはかからなかったけど、SaaS事業の収益は少し減少した。",
                effects: [{ type: 'income_multiplier', businessId: 'saas', multiplier: 0.85 }]
            }
        ]
    },
    {
        requiredBusinessLevel: { businessId: 'app', level: 25 },
        minIncomeRequired: 5000,
        description: "あなたのモバイルアプリがレベル25に到達し、業界で知らない人はいない存在に。巨大IT企業から、驚くような金額での買収提案が舞い込んだ！",
        options: [
            {
                text: "提案を受け入れ、莫大な資金を手にする！",
                resultText: "あなたは巨万の富を得た！でも、大切に育てたアプリはもうあなたのものじゃない…（アプリ事業の収益がゼロになります）",
                effects: [
                    { type: 'money', amount: 500000000 },
                    { type: 'income_multiplier', businessId: 'app', multiplier: 0 }
                ]
            },
            {
                text: "愛着のあるアプリは手放さない！",
                resultText: "あなたの決断は社員の士気を高め、ユーザーにも称賛された！アプリはこれからもあなたの元で輝き続ける！（アプリ事業の収益がさらにアップ！）",
                effects: [{ type: 'income_multiplier', businessId: 'app', multiplier: 2.0 }]
            }
        ]
    },
    {
        minIncomeRequired: 100000000,
        description: "あなたのAIペットカフェの看板ペット「もふもふAI」が、なんと自分で伝説のデザートレシピを開発した！商品化すれば大ヒット間違いなしだけど、開発費がかなりかかりそう…",
        options: [
            {
                text: "夢に投資！最高の材料でレシピを再現する",
                resultText: "デザートは歴史的な大ヒット！カフェの収益が爆発的に増加した！",
                effects: [
                    { type: 'money', amount: -500000000 },
                    { type: 'income_multiplier', businessId: 'ai_cafe', multiplier: 2.5 }
                ]
            },
            {
                text: "リスクは避けて、普通のメニューとして出す",
                resultText: "デザートはそこそこ人気に。大きな利益は出なかったけど、カフェは今日も平和。",
                effects: [{ type: 'income_multiplier', businessId: 'ai_cafe', multiplier: 1.1 }]
            }
        ]
    },
    {
        minIncomeRequired: 0,
        description: "月面リゾートに、遠い星からのお客様がやってきた！彼らはお土産に「星のかけら」を大量に買ってくれそうだけど、彼らの通貨は地球では使えないみたい…",
        options: [
            {
                text: "未知の通貨でも受け入れる！未来への投資！",
                resultText: "後日、その通貨が超高価値な希少資源だと判明！莫大な臨時収入を得た！",
                effects: [{ type: 'money', amount: 500000000000 }]
            },
            {
                text: "残念だけど、日本円でお願いする",
                resultText: "お客様はがっかりして少しだけ買って帰ってしまった。安全だったけど、大きなチャンスを逃したかも…",
                effects: [{ type: 'money', amount: 1000000000 }]
            }
        ]
    },
    {
        minIncomeRequired: 100000000000,
        description: "時間旅行エージェンシーのツアーで、うっかり未来のスポーツくじの結果を見てしまった！この情報、どうする…？",
        options: [
            {
                text: "こっそりくじを買って、会社を大きくする！",
                resultText: "くじは大当たり！でも、時間の流れを少し乱してしまったようで、他の事業の収益が少し不安定になってしまった…",
                effects: [
                    { type: 'money', amount: 100000000000000 },
                    { type: 'income_multiplier', businessId: 'rocket', multiplier: 0.95 }
                ]
            },
            {
                text: "歴史を変えるわけにはいかない！見なかったことにする",
                resultText: "あなたの倫理観は素晴らしい！時の女神が微笑んで、時間旅行エージェンシーの評判が上がり収益が増えた。",
                effects: [{ type: 'income_multiplier', businessId: 'time_travel', multiplier: 1.5 }]
            }
        ]
    },
    {
        minIncomeRequired: 10000000000000,
        description: "次元間マーケットで、4次元空間の商人が「存在しない色」の染料を売りに来た。これを仕入れればアパレル業界に革命を起こせるかも！でも、副作用は未知数…",
        options: [
            {
                text: "革命のために仕入れる！",
                resultText: "染料を使った服は大ヒット！でも、副作用でたまにお店の看板が透明になってしまい、雑貨屋さんの収益が少し下がった。",
                effects: [
                    { type: 'income_multiplier', businessId: 'interdimensional_market', multiplier: 2.0 },
                    { type: 'income_multiplier', businessId: 'general_store', multiplier: 0.9 }
                ]
            },
            {
                text: "安全第一。今回は見送る",
                resultText: "賢明な判断だね。会社は安定したまま。でも、ライバル会社が「存在しない色」で大儲けしたという噂を聞いた…",
                effects: [{ type: 'money', amount: 0 }]
            }
        ]
    }
];