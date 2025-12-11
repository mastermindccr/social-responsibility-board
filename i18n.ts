import { useState, useCallback } from 'react';

export type Language = string;

export type UiKey =
  | "appName"
  | "taglineShort"
  | "taglineHero"
  | "connectingWallet"
  | "communityWarmLine"
  | "miniBubbleTitle"
  | "miniBubbleSubtitle"
  | "miniBubbleContent"
  | "miniBubbleFootnote"
  | "miniBubbleTitle2"
  | "miniBubbleSubtitle2"
  | "miniBubbleContent2"
  | "miniBubbleFootnote2"
  | "miniBubbleTitle3"
  | "miniBubbleSubtitle3"
  | "miniBubbleContent3"
  | "miniBubbleFootnote3"
  | "heroTitle"
  | "heroSubtitle"
  | "connectButton"
  | "connectHint"
  | "walletStatusConnected"
  | "walletStatusNotConnected"
  | "navNewPost"
  | "navViewPosts"
  | "navBack"
  | "postListTitle"
  | "newPostTitle"
  | "fieldTitle"
  | "fieldContent"
  | "fieldDueDate"
  | "fieldReason"
  | "labelAuthor"
  | "labelCreatedAt"
  | "labelDueDate"
  | "labelUnlimited"
  | "labelComments"
  | "labelReports"
  | "buttonSubmit"
  | "buttonCancel"
  | "buttonReport"
  | "buttonReply"
  | "buttonViewDetail"
  | "buttonDisconnect"
  | "errorMetamaskMissing"
  | "errorWalletConnectFailed"
  | "footerLine1"
  | "footerLine2"
  | "footerLine3";

const TRANSLATIONS: Record<Language, Record<UiKey, string>> = {
  // English
  "en": {
    appName: "Social Responsibility Board",
    taglineShort: "A small Web3 community for responsible speech",
    taglineHero: "On-chain, for kinder conversations",
    connectingWallet: "Connecting...",
    communityWarmLine: "Several addresses are already practicing responsible speech here.",
    
    // Carousel Item 1
    miniBubbleTitle: "Today on the chain",
    miniBubbleSubtitle: "A quiet thought",
    miniBubbleContent: "Sometimes, just putting it on the blockchain makes it feel real. I hope we can all be a bit kinder.",
    miniBubbleFootnote: "Anonymous via 0x...a1b2",
    
    // Carousel Item 2
    miniBubbleTitle2: "Past Echo",
    miniBubbleSubtitle2: "Block #192043",
    miniBubbleContent2: "Looking back at my first post. I was angry then. I'm glad I can't delete it, it reminds me how I've grown.",
    miniBubbleFootnote2: "Recovered 0x...99",

    // Carousel Item 3
    miniBubbleTitle3: "Future Gaze",
    miniBubbleSubtitle3: "Note to self",
    miniBubbleContent3: "Be the person you want to meet on-chain. Trust is hard to earn but easy to lose.",
    miniBubbleFootnote3: "Dreamer.eth",

    heroTitle: "A Responsible Web3 Community",
    heroSubtitle: "Where every word is immutable, traceable, and cannot be silently deleted.",
    connectButton: "Connect MetaMask",
    connectHint: "Please connect your wallet to participate.",
    walletStatusConnected: "Wallet Connected",
    walletStatusNotConnected: "Not Connected",
    navNewPost: "New Post",
    navViewPosts: "View Posts",
    navBack: "Back",
    postListTitle: "Community Posts",
    newPostTitle: "Create New Post",
    fieldTitle: "Title",
    fieldContent: "Content",
    fieldDueDate: "Due Date (Optional)",
    fieldReason: "Reason",
    labelAuthor: "Author",
    labelCreatedAt: "Created At",
    labelDueDate: "Due Date",
    labelUnlimited: "Unlimited",
    labelComments: "Comments",
    labelReports: "Reports",
    buttonSubmit: "Submit",
    buttonCancel: "Cancel",
    buttonReport: "Report",
    buttonReply: "Reply",
    buttonViewDetail: "View Detail",
    buttonDisconnect: "Disconnect",
    errorMetamaskMissing: "MetaMask not detected. If you are viewing this in Google AI Studio Preview, the sandbox prevents wallet extensions from loading. Please run this locally.",
    errorWalletConnectFailed: "Failed to connect wallet.",
    footerLine1: "© 2025 Social Responsibility Board. Running on Ethereum.",
    footerLine2: "Built by ㄈㄣˋ ㄑㄧㄥ💋",
    footerLine3: "All actions are immutable and traceable."
  },
  // Traditional Chinese
  "zh-TW": {
    appName: "Social Responsibility Board",
    taglineShort: "一個為發言負責的 Web3 小社群",
    taglineHero: "讓每一句話，都對得起自己",
    connectingWallet: "連接中...",
    communityWarmLine: "已經有幾個地址在這裡練習「講話負責任」。",
    
    miniBubbleTitle: "鏈上今日",
    miniBubbleSubtitle: "一句悄悄話",
    miniBubbleContent: "有時候，只要寫在區塊鏈上，就覺得真實了起來。希望我們都能善良一點。",
    miniBubbleFootnote: "來自 0x...a1b2 的匿名分享",

    miniBubbleTitle2: "過去的迴響",
    miniBubbleSubtitle2: "區塊高度 #192043",
    miniBubbleContent2: "回頭看我第一篇貼文，當時我很生氣。很高興我刪不掉它，它提醒了我這些年來的成長。",
    miniBubbleFootnote2: "Recovered 0x...99",

    miniBubbleTitle3: "凝視未來",
    miniBubbleSubtitle3: "給自己的筆記",
    miniBubbleContent3: "成為你想在鏈上遇見的那種人。信任很難建立，卻很容易失去。",
    miniBubbleFootnote3: "Dreamer.eth",

    heroTitle: "負責任的 Web3 社群",
    heroSubtitle: "在這裡，每一句話都不可被悄悄刪除，留下清楚、可追溯的紀錄。",
    connectButton: "連接 MetaMask",
    connectHint: "請先連接錢包，再一起參與這個實驗。",
    walletStatusConnected: "錢包已連接",
    walletStatusNotConnected: "尚未連接",
    navNewPost: "發布貼文",
    navViewPosts: "查看貼文",
    navBack: "返回",
    postListTitle: "社群貼文",
    newPostTitle: "建立新貼文",
    fieldTitle: "標題",
    fieldContent: "內容",
    fieldDueDate: "到期日 (選填)",
    fieldReason: "理由",
    labelAuthor: "作者",
    labelCreatedAt: "建立時間",
    labelDueDate: "到期日",
    labelUnlimited: "無限期",
    labelComments: "留言",
    labelReports: "檢舉",
    buttonSubmit: "送出",
    buttonCancel: "取消",
    buttonReport: "檢舉",
    buttonReply: "回覆",
    buttonViewDetail: "查看詳情",
    buttonDisconnect: "斷開連接",
    errorMetamaskMissing: "未偵測到 MetaMask。如果您是在 Google AI Studio 預覽中，沙盒環境會阻擋擴充功能。",
    errorWalletConnectFailed: "連接錢包失敗。",
    footerLine1: "© 2025 Social Responsibility Board。運行於 Ethereum。",
    footerLine2: "Built by ㄈㄣˋ ㄑㄧㄥ💋",
    footerLine3: "所有行為皆不可篡改，且可以被追溯。"
  },
  // Simplified Chinese
  "zh-CN": {
    appName: "Social Responsibility Board",
    taglineShort: "一个为发言负责的 Web3 小社区",
    taglineHero: "让每一句话，都对得起自己",
    connectingWallet: "连接中...",
    communityWarmLine: "已经有几个地址在这里练习“讲话负责任”。",
    
    miniBubbleTitle: "链上今日",
    miniBubbleSubtitle: "一句悄悄话",
    miniBubbleContent: "有时候，只要写在区块链上，就觉得真实了起来。希望我们都能善良一点。",
    miniBubbleFootnote: "来自 0x...a1b2 的匿名分享",

    miniBubbleTitle2: "过去的回响",
    miniBubbleSubtitle2: "区块高度 #192043",
    miniBubbleContent2: "回头看我第一篇帖子，当时我很生气。很高兴我删不掉它，它提醒了我这些年来的成长。",
    miniBubbleFootnote2: "Recovered 0x...99",

    miniBubbleTitle3: "凝视未来",
    miniBubbleSubtitle3: "给自己的笔记",
    miniBubbleContent3: "成为你想在链上遇见的如那种人。信任很难建立，却很容易失去。",
    miniBubbleFootnote3: "Dreamer.eth",

    heroTitle: "负责任的 Web3 社区",
    heroSubtitle: "在这里，每一句话都不可被悄悄删除，留下清楚、可追溯的纪录。",
    connectButton: "连接 MetaMask",
    connectHint: "请先连接钱包，再一起参与这个实验。",
    walletStatusConnected: "钱包已连接",
    walletStatusNotConnected: "尚未连接",
    navNewPost: "发布帖子",
    navViewPosts: "查看帖子",
    navBack: "返回",
    postListTitle: "社区帖子",
    newPostTitle: "创建新帖子",
    fieldTitle: "标题",
    fieldContent: "内容",
    fieldDueDate: "到期日 (选填)",
    fieldReason: "理由",
    labelAuthor: "作者",
    labelCreatedAt: "创建时间",
    labelDueDate: "到期日",
    labelUnlimited: "无限期",
    labelComments: "评论",
    labelReports: "举报",
    buttonSubmit: "提交",
    buttonCancel: "取消",
    buttonReport: "举报",
    buttonReply: "回复",
    buttonViewDetail: "查看详情",
    buttonDisconnect: "断开连接",
    errorMetamaskMissing: "未检测到 MetaMask。如果您是在 Google AI Studio 预览中，沙盒环境会阻挡扩展功能。",
    errorWalletConnectFailed: "连接钱包失败。",
    footerLine1: "© 2025 Social Responsibility Board。运行于 Ethereum。",
    footerLine2: "Built by ㄈㄣˋ ㄑㄧㄥ💋",
    footerLine3: "所有行为皆不可篡改，且可以被追溯。"
  },
  // Japanese
  "ja": {
    appName: "Social Responsibility Board",
    taglineShort: "発言に責任を持つ小さなWeb3コミュニティ",
    taglineHero: "On-chain、もっと優しい会話のために",
    connectingWallet: "接続中...",
    communityWarmLine: "すでにいくつかのアドレスがここで「責任ある発言」を実践しています。",
    
    miniBubbleTitle: "今日のオンチェーン",
    miniBubbleSubtitle: "静かなつぶやき",
    miniBubbleContent: "ブロックチェーンに刻むだけで、言葉が現実味を帯びることがあります。私たちがもう少し優しくなれますように。",
    miniBubbleFootnote: "0x...a1b2 からの匿名シェア",

    miniBubbleTitle2: "過去の残響",
    miniBubbleSubtitle2: "ブロック #192043",
    miniBubbleContent2: "最初の投稿を振り返ると、怒りに満ちていました。消せないことが、私の成長を思い出させてくれます。",
    miniBubbleFootnote2: "Recovered 0x...99",

    miniBubbleTitle3: "未来への眼差し",
    miniBubbleSubtitle3: "自分へのメモ",
    miniBubbleContent3: "オンチェーンで出会いたいような人になりなさい。信頼は築くのが難しく、失うのは簡単です。",
    miniBubbleFootnote3: "Dreamer.eth",

    heroTitle: "責任ある Web3 コミュニティ",
    heroSubtitle: "すべての発言は不変で追跡可能であり、密かに削除されることはありません。",
    connectButton: "MetaMask を接続",
    connectHint: "参加するにはウォレットを接続してください。",
    walletStatusConnected: "接続済み",
    walletStatusNotConnected: "未接続",
    navNewPost: "新規投稿",
    navViewPosts: "投稿一覧",
    navBack: "戻る",
    postListTitle: "コミュニティ投稿",
    newPostTitle: "新しい投稿を作成",
    fieldTitle: "タイトル",
    fieldContent: "内容",
    fieldDueDate: "期限 (任意)",
    fieldReason: "理由",
    labelAuthor: "作成者",
    labelCreatedAt: "作成日時",
    labelDueDate: "期限",
    labelUnlimited: "無期限",
    labelComments: "コメント",
    labelReports: "通報",
    buttonSubmit: "送信",
    buttonCancel: "キャンセル",
    buttonReport: "通報",
    buttonReply: "返信",
    buttonViewDetail: "詳細を見る",
    buttonDisconnect: "切断",
    errorMetamaskMissing: "MetaMask が検出されません。Google AI Studio プレビューでは拡張機能がブロックされます。",
    errorWalletConnectFailed: "ウォレットの接続に失敗しました。",
    footerLine1: "© 2025 Social Responsibility Board。Ethereum 上で稼働。",
    footerLine2: "Built by ㄈㄣˋ ㄑㄧㄥ💋",
    footerLine3: "すべてのアクションは不変で追跡可能です。"
  },
  // Korean
  "ko": {
    appName: "Social Responsibility Board",
    taglineShort: "발언에 책임을 지는 작은 Web3 커뮤니티",
    taglineHero: "On-chain, 더 따뜻한 대화를 위해",
    connectingWallet: "연결 중...",
    communityWarmLine: "이미 몇몇 주소들이 이곳에서 '책임감 있는 발언'을 연습하고 있습니다.",
    
    miniBubbleTitle: "오늘의 온체인",
    miniBubbleSubtitle: "조용한 독백",
    miniBubbleContent: "때로는 블록체인에 기록하는 것만으로도 말이 현실감을 갖게 됩니다. 우리 모두가 조금 더 다정해질 수 있기를 바랍니다.",
    miniBubbleFootnote: "0x...a1b2의 익명 공유",

    miniBubbleTitle2: "과거의 메아리",
    miniBubbleSubtitle2: "블록 #192043",
    miniBubbleContent2: "내 첫 게시물을 되돌아보면, 그때는 화가 나 있었죠. 지울 수 없다는 게 다행이에요. 제가 얼마나 성장했는지 상기시켜 주니까요.",
    miniBubbleFootnote2: "Recovered 0x...99",

    miniBubbleTitle3: "미래를 향한 시선",
    miniBubbleSubtitle3: "자신에게 남기는 메모",
    miniBubbleContent3: "온체인에서 만나고 싶은 그런 사람이 되세요. 신뢰는 쌓기 어렵지만 잃기는 쉽습니다.",
    miniBubbleFootnote3: "Dreamer.eth",

    heroTitle: "책임감 있는 Web3 커뮤니티",
    heroSubtitle: "이곳의 모든 말은 불변하고 추적 가능하며, 몰래 삭제될 수 없습니다.",
    connectButton: "MetaMask 연결",
    connectHint: "참여하려면 지갑을 연결해 주세요.",
    walletStatusConnected: "지갑 연결됨",
    walletStatusNotConnected: "연결되지 않음",
    navNewPost: "새 게시물",
    navViewPosts: "게시물 보기",
    navBack: "뒤로",
    postListTitle: "커뮤니티 게시물",
    newPostTitle: "새 게시물 작성",
    fieldTitle: "제목",
    fieldContent: "내용",
    fieldDueDate: "마감일 (선택)",
    fieldReason: "이유",
    labelAuthor: "작성자",
    labelCreatedAt: "작성일",
    labelDueDate: "마감일",
    labelUnlimited: "무제한",
    labelComments: "댓글",
    labelReports: "신고",
    buttonSubmit: "제출",
    buttonCancel: "취소",
    buttonReport: "신고",
    buttonReply: "답글",
    buttonViewDetail: "상세 보기",
    buttonDisconnect: "연결 해제",
    errorMetamaskMissing: "MetaMask가 감지되지 않았습니다. Google AI Studio 미리보기에서는 확장이 차단됩니다.",
    errorWalletConnectFailed: "지갑 연결 실패.",
    footerLine1: "© 2025 Social Responsibility Board. Ethereum에서 실행.",
    footerLine2: "Built by ㄈㄣˋ ㄑㄧㄥ💋",
    footerLine3: "모든 행동은 불변하며 추적 가능합니다."
  },
  // French
  "fr": {
    appName: "Social Responsibility Board",
    taglineShort: "Une petite communauté Web3 pour une parole responsable",
    taglineHero: "On-chain, pour des conversations plus bienveillantes",
    connectingWallet: "Connexion en cours...",
    communityWarmLine: "Plusieurs adresses pratiquent déjà la parole responsable ici.",
    miniBubbleTitle: "Aujourd'hui sur la chaîne",
    miniBubbleSubtitle: "Une pensée silencieuse",
    miniBubbleContent: "Parfois, le simple fait de l'écrire sur la blockchain le rend réel. J'espère que nous pourrons tous être un peu plus bienveillants.",
    miniBubbleFootnote: "Anonyme via 0x...a1b2",
    
    miniBubbleTitle2: "Écho du passé",
    miniBubbleSubtitle2: "Bloc #192043",
    miniBubbleContent2: "En regardant mon premier post, j'étais en colère. Je suis content de ne pas pouvoir le supprimer, cela me rappelle comment j'ai grandi.",
    miniBubbleFootnote2: "Recovered 0x...99",

    miniBubbleTitle3: "Regard vers le futur",
    miniBubbleSubtitle3: "Note à soi-même",
    miniBubbleContent3: "Soyez la personne que vous aimeriez rencontrer sur la chaîne. La confiance est difficile à gagner mais facile à perdre.",
    miniBubbleFootnote3: "Dreamer.eth",

    heroTitle: "Une communauté Web3 responsable",
    heroSubtitle: "Où chaque mot est immuable, traçable et ne peut être supprimé silencieusement.",
    connectButton: "Connecter MetaMask",
    connectHint: "Veuillez connecter votre portefeuille pour participer.",
    walletStatusConnected: "Connecté",
    walletStatusNotConnected: "Non connecté",
    navNewPost: "Nouveau post",
    navViewPosts: "Voir les posts",
    navBack: "Retour",
    postListTitle: "Posts de la communauté",
    newPostTitle: "Créer un nouveau post",
    fieldTitle: "Titre",
    fieldContent: "Contenu",
    fieldDueDate: "Date d'échéance (Optionnel)",
    fieldReason: "Raison",
    labelAuthor: "Auteur",
    labelCreatedAt: "Créé le",
    labelDueDate: "Date d'échéance",
    labelUnlimited: "Illimité",
    labelComments: "Commentaires",
    labelReports: "Signalements",
    buttonSubmit: "Soumettre",
    buttonCancel: "Annuler",
    buttonReport: "Signaler",
    buttonReply: "Répondre",
    buttonViewDetail: "Voir détails",
    buttonDisconnect: "Déconnecter",
    errorMetamaskMissing: "MetaMask non détecté. Le bac à sable Google AI Studio empêche le chargement des extensions.",
    errorWalletConnectFailed: "Échec de la connexion du portefeuille.",
    footerLine1: "© 2025 Social Responsibility Board. Fonctionne sur Ethereum.",
    footerLine2: "Built by ㄈㄣˋ ㄑㄧㄥ💋",
    footerLine3: "Toutes les actions sont immuables et traçables."
  },
  // Spanish
  "es": {
    appName: "Social Responsibility Board",
    taglineShort: "Una pequeña comunidad Web3 para el habla responsable",
    taglineHero: "On-chain, para conversaciones más amables",
    connectingWallet: "Conectando...",
    communityWarmLine: "Varias direcciones ya están practicando el habla responsable aquí.",
    miniBubbleTitle: "Hoy en la cadena",
    miniBubbleSubtitle: "Un pensamiento tranquilo",
    miniBubbleContent: "A veces, solo ponerlo en la blockchain lo hace sentir real. Espero que todos podamos ser un poco más amables.",
    miniBubbleFootnote: "Anónimo vía 0x...a1b2",
    
    miniBubbleTitle2: "Eco del pasado",
    miniBubbleSubtitle2: "Bloque #192043",
    miniBubbleContent2: "Mirando atrás a mi primer post, estaba enojado. Me alegro de no poder borrarlo, me recuerda cómo he crecido.",
    miniBubbleFootnote2: "Recovered 0x...99",

    miniBubbleTitle3: "Mirada al futuro",
    miniBubbleSubtitle3: "Nota para mí mismo",
    miniBubbleContent3: "Sé la persona que te gustaría encontrar en la cadena. La confianza es difícil de ganar pero fácil de perder.",
    miniBubbleFootnote3: "Dreamer.eth",

    heroTitle: "Una comunidad Web3 responsable",
    heroSubtitle: "Donde cada palabra es inmutable, rastreable y no puede ser eliminada silenciosamente.",
    connectButton: "Conectar MetaMask",
    connectHint: "Por favor, conecta tu billetera para participar.",
    walletStatusConnected: "Conectado",
    walletStatusNotConnected: "No conectado",
    navNewPost: "Nueva publicación",
    navViewPosts: "Ver publicaciones",
    navBack: "Atrás",
    postListTitle: "Publicaciones de la comunidad",
    newPostTitle: "Crear nueva publicación",
    fieldTitle: "Título",
    fieldContent: "Contenido",
    fieldDueDate: "Fecha límite (Opcional)",
    fieldReason: "Razón",
    labelAuthor: "Autor",
    labelCreatedAt: "Creado en",
    labelDueDate: "Fecha límite",
    labelUnlimited: "Ilimitado",
    labelComments: "Comentarios",
    labelReports: "Reportes",
    buttonSubmit: "Enviar",
    buttonCancel: "Cancelar",
    buttonReport: "Reportar",
    buttonReply: "Responder",
    buttonViewDetail: "Ver detalles",
    buttonDisconnect: "Desconectar",
    errorMetamaskMissing: "MetaMask no detectado. El entorno de Google AI Studio impide cargar extensiones.",
    errorWalletConnectFailed: "Error al conectar la billetera.",
    footerLine1: "© 2025 Social Responsibility Board. Corriendo en Ethereum.",
    footerLine2: "Built by ㄈㄣˋ ㄑㄧㄥ💋",
    footerLine3: "Todas las acciones son inmutables y rastreables."
  },
  // German
  "de": {
    appName: "Social Responsibility Board",
    taglineShort: "Eine kleine Web3-Community für verantwortungsvolles Sprechen",
    taglineHero: "On-Chain, für freundlichere Gespräche",
    connectingWallet: "Verbinde...",
    communityWarmLine: "Einige Adressen üben hier bereits verantwortungsvolles Sprechen.",
    miniBubbleTitle: "Heute auf der Chain",
    miniBubbleSubtitle: "Ein stiller Gedanke",
    miniBubbleContent: "Manchmal macht es sich erst real an, wenn man es auf die Blockchain schreibt. Ich hoffe, wir können alle etwas freundlicher sein.",
    miniBubbleFootnote: "Anonym via 0x...a1b2",
    
    miniBubbleTitle2: "Echo der Vergangenheit",
    miniBubbleSubtitle2: "Block #192043",
    miniBubbleContent2: "Wenn ich auf meinen ersten Beitrag zurückblicke, war ich wütend. Ich bin froh, dass ich ihn nicht löschen kann, er erinnert mich daran, wie ich gewachsen bin.",
    miniBubbleFootnote2: "Recovered 0x...99",

    miniBubbleTitle3: "Blick in die Zukunft",
    miniBubbleSubtitle3: "Notiz an mich selbst",
    miniBubbleContent3: "Sei die Person, die du auf der Chain treffen möchtest. Vertrauen ist schwer zu gewinnen, aber leicht zu verlieren.",
    miniBubbleFootnote3: "Dreamer.eth",

    heroTitle: "Eine verantwortungsvolle Web3-Community",
    heroSubtitle: "Wo jedes Wort unveränderlich, nachvollziehbar und nicht stillschweigend gelöscht werden kann.",
    connectButton: "MetaMask verbinden",
    connectHint: "Bitte verbinden Sie Ihr Wallet, um teilzunehmen.",
    walletStatusConnected: "Verbunden",
    walletStatusNotConnected: "Nicht verbunden",
    navNewPost: "Neuer Beitrag",
    navViewPosts: "Beiträge anzeigen",
    navBack: "Zurück",
    postListTitle: "Community-Beiträge",
    newPostTitle: "Neuen Beitrag erstellen",
    fieldTitle: "Titel",
    fieldContent: "Inhalt",
    fieldDueDate: "Fälligkeitsdatum (Optional)",
    fieldReason: "Grund",
    labelAuthor: "Autor",
    labelCreatedAt: "Erstellt am",
    labelDueDate: "Fälligkeitsdatum",
    labelUnlimited: "Unbegrenzt",
    labelComments: "Kommentare",
    labelReports: "Meldungen",
    buttonSubmit: "Absenden",
    buttonCancel: "Abbrechen",
    buttonReport: "Melden",
    buttonReply: "Antworten",
    buttonViewDetail: "Details anzeigen",
    buttonDisconnect: "Trennen",
    errorMetamaskMissing: "MetaMask nicht erkannt. Die Google AI Studio-Sandbox verhindert das Laden von Erweiterungen.",
    errorWalletConnectFailed: "Verbindung zum Wallet fehlgeschlagen.",
    footerLine1: "© 2025 Social Responsibility Board. Läuft auf Ethereum.",
    footerLine2: "Built by ㄈㄣˋ ㄑㄧㄥ💋",
    footerLine3: "Alle Aktionen sind unveränderlich und nachvollziehbar."
  },
  // Indonesian
  "id": {
    appName: "Social Responsibility Board",
    taglineShort: "Komunitas Web3 kecil untuk pembicaraan yang bertanggung jawab",
    taglineHero: "On-chain, untuk percakapan yang lebih ramah",
    connectingWallet: "Menghubungkan...",
    communityWarmLine: "Beberapa alamat sudah mempraktikkan pembicaraan yang bertanggung jawab di sini.",
    miniBubbleTitle: "Hari ini di chain",
    miniBubbleSubtitle: "Sebuah pikiran tenang",
    miniBubbleContent: "Terkadang, hanya dengan menaruhnya di blockchain membuatnya terasa nyata. Saya berharap kita semua bisa sedikit lebih ramah.",
    miniBubbleFootnote: "Anonim via 0x...a1b2",
    
    miniBubbleTitle2: "Gema Masa Lalu",
    miniBubbleSubtitle2: "Blok #192043",
    miniBubbleContent2: "Melihat kembali postingan pertama saya, saya marah saat itu. Saya senang saya tidak bisa menghapusnya, itu mengingatkan saya bagaimana saya telah tumbuh.",
    miniBubbleFootnote2: "Recovered 0x...99",

    miniBubbleTitle3: "Tatapan Masa Depan",
    miniBubbleSubtitle3: "Catatan untuk diri sendiri",
    miniBubbleContent3: "Jadilah orang yang ingin Anda temui di on-chain. Kepercayaan sulit didapat tetapi mudah hilang.",
    miniBubbleFootnote3: "Dreamer.eth",

    heroTitle: "Komunitas Web3 yang Bertanggung Jawab",
    heroSubtitle: "Di mana setiap kata tidak dapat diubah, dapat dilacak, dan tidak dapat dihapus secara diam-diam.",
    connectButton: "Hubungkan MetaMask",
    connectHint: "Silakan hubungkan dompet Anda untuk berpartisipasi.",
    walletStatusConnected: "Terhubung",
    walletStatusNotConnected: "Tidak Terhubung",
    navNewPost: "Postingan Baru",
    navViewPosts: "Lihat Postingan",
    navBack: "Kembali",
    postListTitle: "Postingan Komunitas",
    newPostTitle: "Buat Postingan Baru",
    fieldTitle: "Judul",
    fieldContent: "Konten",
    fieldDueDate: "Tenggat Waktu (Opsional)",
    fieldReason: "Alasan",
    labelAuthor: "Penulis",
    labelCreatedAt: "Dibuat Pada",
    labelDueDate: "Tenggat Waktu",
    labelUnlimited: "Tidak Terbatas",
    labelComments: "Komentar",
    labelReports: "Laporan",
    buttonSubmit: "Kirim",
    buttonCancel: "Batal",
    buttonReport: "Lapor",
    buttonReply: "Balas",
    buttonViewDetail: "Lihat Detail",
    buttonDisconnect: "Putuskan",
    errorMetamaskMissing: "MetaMask tidak terdeteksi. Sandbox Google AI Studio mencegah ekstensi dimuat.",
    errorWalletConnectFailed: "Gagal menghubungkan dompet.",
    footerLine1: "© 2025 Social Responsibility Board. Berjalan di Ethereum.",
    footerLine2: "Built by ㄈㄣˋ ㄑㄧㄥ💋",
    footerLine3: "Semua tindakan tidak dapat diubah dan dapat dilacak."
  },
  // Vietnamese
  "vi": {
    appName: "Social Responsibility Board",
    taglineShort: "Một cộng đồng Web3 nhỏ cho lời nói có trách nhiệm",
    taglineHero: "On-chain, cho những cuộc trò chuyện tử tế hơn",
    connectingWallet: "Đang kết nối...",
    communityWarmLine: "Một số địa chỉ đã thực hành lời nói có trách nhiệm tại đây.",
    miniBubbleTitle: "Hôm nay trên chuỗi",
    miniBubbleSubtitle: "Một suy nghĩ lặng lẽ",
    miniBubbleContent: "Đôi khi, chỉ cần đưa nó lên blockchain là cảm thấy thực tế. Tôi hy vọng tất cả chúng ta có thể tử tế hơn một chút.",
    miniBubbleFootnote: "Ẩn danh qua 0x...a1b2",
    
    miniBubbleTitle2: "Tiếng vọng quá khứ",
    miniBubbleSubtitle2: "Khối #192043",
    miniBubbleContent2: "Nhìn lại bài đăng đầu tiên của mình, lúc đó tôi rất tức giận. Tôi mừng vì không thể xóa nó, nó nhắc nhở tôi đã trưởng thành như thế nào.",
    miniBubbleFootnote2: "Recovered 0x...99",

    miniBubbleTitle3: "Cái nhìn tương lai",
    miniBubbleSubtitle3: "Ghi chú cho bản thân",
    miniBubbleContent3: "Hãy là người mà bạn muốn gặp trên chuỗi. Niềm tin khó kiếm nhưng dễ mất.",
    miniBubbleFootnote3: "Dreamer.eth",

    heroTitle: "Cộng đồng Web3 có trách nhiệm",
    heroSubtitle: "Nơi mọi lời nói là bất biến, có thể truy xuất nguồn gốc và không thể bị xóa âm thầm.",
    connectButton: "Kết nối MetaMask",
    connectHint: "Vui lòng kết nối ví của bạn để tham gia.",
    walletStatusConnected: "Đã kết nối",
    walletStatusNotConnected: "Chưa kết nối",
    navNewPost: "Bài đăng mới",
    navViewPosts: "Xem bài đăng",
    navBack: "Quay lại",
    postListTitle: "Bài đăng cộng đồng",
    newPostTitle: "Tạo bài đăng mới",
    fieldTitle: "Tiêu đề",
    fieldContent: "Nội dung",
    fieldDueDate: "Ngày hết hạn (Tùy chọn)",
    fieldReason: "Lý do",
    labelAuthor: "Tác giả",
    labelCreatedAt: "Được tạo lúc",
    labelDueDate: "Ngày hết hạn",
    labelUnlimited: "Không giới hạn",
    labelComments: "Bình luận",
    labelReports: "Báo cáo",
    buttonSubmit: "Gửi",
    buttonCancel: "Hủy",
    buttonReport: "Báo cáo",
    buttonReply: "Trả lời",
    buttonViewDetail: "Xem chi tiết",
    buttonDisconnect: "Ngắt kết nối",
    errorMetamaskMissing: "Không phát hiện thấy MetaMask. Sandbox của Google AI Studio ngăn tải tiện ích mở rộng.",
    errorWalletConnectFailed: "Không thể kết nối ví.",
    footerLine1: "© 2025 Social Responsibility Board. Chạy trên Ethereum.",
    footerLine2: "Built by ㄈㄣˋ ㄑㄧㄥ💋",
    footerLine3: "Mọi hành động đều bất biến và có thể truy xuất nguồn gốc."
  }
};

export const AVAILABLE_LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "zh-TW", label: "繁體中文" },
  { code: "zh-CN", label: "简体中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "vi", label: "Tiếng Việt" },
];

export const DEFAULT_LANG: Language = "en";

// Hook for using translations
export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANG);
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);

  const t = useCallback((key: UiKey): string => {
    const table = TRANSLATIONS[language] ?? TRANSLATIONS[DEFAULT_LANG];
    return table[key] ?? TRANSLATIONS[DEFAULT_LANG][key] ?? key;
  }, [language]);

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setHasSelectedLanguage(true);
  };

  return { language, setLanguage, hasSelectedLanguage, selectLanguage, t };
};