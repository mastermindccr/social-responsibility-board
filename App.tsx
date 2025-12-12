import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_CHAIN_ID } from './constants';
import { Post, Comment, Report } from './types';
import { useTranslation, AVAILABLE_LANGUAGES, UiKey, Language } from './i18n';

// --- Components ---

const Navbar = ({ 
  address, 
  onConnect, 
  onDisconnect,
  loading,
  currentView, 
  setView,
  language,
  setLanguage,
  t
}: { 
  address: string | null, 
  onConnect: () => void,
  onDisconnect: () => void,
  loading: boolean,
  currentView: string,
  setView: (v: string) => void,
  language: string,
  setLanguage: (l: string) => void,
  t: (k: UiKey) => string
}) => (
  <nav className="w-full bg-white/80 backdrop-blur-md border-b border-white/60 p-4 sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      {/* 左上 Logo：只保留 R 按鈕，點了會回到 home */}
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setView('home')}
      >
        <div className="h-9 w-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md group-hover:bg-indigo-500 transition">
          R
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm">
        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-slate-200 bg-white/80 rounded-full px-3 py-1 text-xs shadow-sm text-slate-600 outline-none focus:border-indigo-400"
        >
          {AVAILABLE_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>

        {address ? (
          <div className="flex gap-4 items-center">
            <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span>{t("walletStatusConnected")}</span>
              <span className="font-mono text-slate-400 ml-1">
                ({address.slice(0, 4)}...{address.slice(-4)})
              </span>
            </div>
            <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200">
              <button 
                onClick={() => setView('new-post')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${currentView === 'new-post' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t("navNewPost")}
              </button>
              <button 
                onClick={() => setView('post-list')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${currentView === 'post-list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t("navViewPosts")}
              </button>
            </div>
            <button 
              onClick={onDisconnect}
              className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-full text-xs font-bold transition shadow-md shadow-rose-200"
            >
              {t("buttonDisconnect")}
            </button>
          </div>
        ) : (
          <button 
            onClick={onConnect}
            disabled={loading}
            className={`bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-full text-xs font-bold transition shadow-md shadow-indigo-200 ${loading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {loading ? t("connectingWallet") : t("connectButton")}
          </button>
        )}
      </div>
    </div>
  </nav>
);

const Footer = ({ t }: { t: (k: UiKey) => string }) => (
  <footer className="w-full py-6 mt-12 text-center space-y-1 font-medium text-white">
    <p className="text-[13px] opacity-90">{t("footerLine1")}</p>
    <p className="text-[13px] opacity-90 font-bold">{t("footerLine2")}</p>
    <p className="text-[13px] opacity-90">{t("footerLine3")}</p>
  </footer>
);

// --- Screen Components ---

const LanguageSelectionScreen = ({
  onSelect,
}: {
  onSelect: (lang: Language) => void;
}) => {
  // 讓 zh-TW（繁體中文）排在列表最前面
  const orderedLanguages = [...AVAILABLE_LANGUAGES].sort((a, b) => {
    if (a.code === "zh-TW") return -1;
    if (b.code === "zh-TW") return 1;
    return 0;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-400 via-indigo-400 to-rose-300 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* 背景 halo */}
      <div className="pointer-events-none absolute top-[-15%] left-[-15%] w-[520px] h-[520px] bg-sky-400/45 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-15%] right-[-15%] w-[520px] h-[520px] bg-rose-400/50 rounded-full blur-[120px]" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* 左邊：貓 + 標題 */}
        <div className="relative text-left pl-2 md:pl-8 flex flex-col items-start gap-4 md:gap-6">
          <img
            src="https://raw.githubusercontent.com/hanajangjangjang/Gist/main/social-cat.png"
            alt="Social Responsibility Cat"
            className="
              w-52 md:w-72 lg:w-80
              -ml-4 md:ml-0
              drop-shadow-[0_18px_45px_rgba(15,23,42,0.45)]
              select-none pointer-events-none
            "
          />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(15,23,42,0.55)] text-white">
            <span className="block">Social</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-indigo-200 to-rose-200">
              Responsibility
            </span>
            <span className="block">Community</span>

            <span className="mt-3 block text-2xl md:text-3xl text-slate-100 font-semibold tracking-tight">
              社會責任社群
            </span>
          </h1>

          <p className="text-slate-100 text-base md:text-lg max-w-md leading-relaxed font-medium">
            <span className="block">
              On-chain. Traceable. Immutable social space.
            </span>
            <span className="block text-slate-200 text-sm md:text-base mt-1">
              Choose your language to join the conversation.
            </span>
            <span className="block text-slate-100 text-sm md:text-base mt-3">
              上鏈紀錄・可追蹤・不可竄改的社群空間。
            </span>
            <span className="block text-slate-200 text-sm md:text-base">
              選一個你舒服的語言，加入這裡的對話練習「講話負責任」。
            </span>
          </p>
        </div>

        {/* 右邊：Select Language 卡片 */}
        <div className="bg-gradient-to-b from-sky-400 via-indigo-400 to-rose-400/95 backdrop-blur-xl border border-white/80 p-7 md:p-9 rounded-[2.5rem] shadow-2xl shadow-sky-900/40">
          <h2 className="text-white text-lg md:text-xl font-semibold mb-6 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
            Select Language
          </h2>

          <div className="bg-white/95 rounded-[2rem] px-4 py-4 md:px-5 md:py-5">
            <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1.5">
              {orderedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onSelect(lang.code)}
                  className="text-left px-5 py-4 rounded-2xl bg-slate-50/90 border border-slate-100
                             hover:bg-white hover:border-sky-200 hover:shadow-md hover:-translate-y-[1px]
                             transition-all duration-200 group"
                >
                  <span className="block text-sm font-semibold text-slate-900 group-hover:text-indigo-600">
                    {lang.label}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-large">
                    {lang.code}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="h-7 w-7 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 text-white flex items-center justify-center text-xs shadow-sm">
                  🙂
                </span>
                <span className="h-7 w-7 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 text-white flex items-center justify-center text-xs shadow-sm">
                  🌱
                </span>
                <span className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-xs shadow-sm">
                  🧡
                </span>
              </div>
              <p className="text-[14px] text-slate-700 bg-white/90 px-3 py-1.5 rounded-2xl shadow-sm">
                選一個你舒服的語言，然後一起練習在鏈上「講話負責任」。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ON_CHAIN_MESSAGES: {
  titleKey: UiKey;
  subtitleKey: UiKey;
  contentKey: UiKey;
  footnoteKey: UiKey;
}[] = [
  {
    titleKey: "miniBubbleTitle",
    subtitleKey: "miniBubbleSubtitle",
    contentKey: "miniBubbleContent",
    footnoteKey: "miniBubbleFootnote",
  },
  {
    titleKey: "miniBubbleTitle2",
    subtitleKey: "miniBubbleSubtitle2",
    contentKey: "miniBubbleContent2",
    footnoteKey: "miniBubbleFootnote2",
  },
  {
    titleKey: "miniBubbleTitle3",
    subtitleKey: "miniBubbleSubtitle3",
    contentKey: "miniBubbleContent3",
    footnoteKey: "miniBubbleFootnote3",
  },
];

const NewPostView = ({
  t,
  newPostTitle,
  setNewPostTitle,
  newPostContent,
  setNewPostContent,
  newPostDate,
  setNewPostDate,
  createPost,
  loading,
  setCurrentView
}: {
  t: (k: UiKey) => string,
  newPostTitle: string,
  setNewPostTitle: (v: string) => void,
  newPostContent: string,
  setNewPostContent: (v: string) => void,
  newPostDate: string,
  setNewPostDate: (v: string) => void,
  createPost: () => void,
  loading: boolean,
  setCurrentView: (v: string) => void
}) => (
  <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-xl mt-8">
    <h2 className="text-2xl font-bold mb-8 text-slate-800 flex items-center gap-3">
      <span className="bg-gradient-to-b from-indigo-400 to-indigo-600 w-1.5 h-8 rounded-full shadow-sm"></span>
      {t("newPostTitle")}
    </h2>
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t("fieldTitle")}</label>
        <input 
          type="text" 
          value={newPostTitle}
          onChange={e => setNewPostTitle(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition shadow-inner"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t("fieldContent")}</label>
        <textarea 
          value={newPostContent}
          onChange={e => setNewPostContent(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 h-40 text-slate-800 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition shadow-inner"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t("fieldDueDate")}</label>
        <input 
          type="datetime-local" 
          value={newPostDate}
          onChange={e => setNewPostDate(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition shadow-inner"
        />
      </div>
      <div className="flex gap-4 pt-4">
        <button 
          onClick={createPost}
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "..." : t("buttonSubmit")}
        </button>
        <button 
          onClick={() => setCurrentView('home')}
          className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-50 transition"
        >
          {t("buttonCancel")}
        </button>
      </div>
    </div>
  </div>
);

const PostDetailView = ({
  selectedPost,
  t,
  setCurrentView,
  formatDate,
  selectedPostReports,
  selectedPostComments,
  newComment,
  setNewComment,
  submitComment,
  loading
}: {
  selectedPost: Post | null,
  t: (k: UiKey) => string,
  setCurrentView: (v: string) => void,
  formatDate: (timestamp: bigint) => string,
  selectedPostReports: Report[],
  selectedPostComments: Comment[],
  newComment: string,
  setNewComment: (v: string) => void,
  submitComment: () => void,
  loading: boolean
}) => {
  if (!selectedPost) return null;

  const isExpired = Number(selectedPost.dueDate) > 0 && Date.now() / 1000 > Number(selectedPost.dueDate);

  return (
    <div className="max-w-3xl mx-auto space-y-8 mt-4">
      <button onClick={() => setCurrentView('post-list')} className="text-slate-500 hover:text-slate-800 transition flex items-center gap-2 mb-4 group font-medium text-sm">
        <span className="bg-white border border-slate-200 p-1.5 rounded-full group-hover:border-slate-300 transition shadow-sm">&larr;</span> {t("navBack")}
      </button>
      
      {/* Main Post Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-400 to-purple-500" />
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">{selectedPost.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-xs mb-8 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <span className="text-slate-400 uppercase tracking-wide font-bold">{t("labelAuthor")}</span>
            <span className="font-mono text-indigo-600 font-medium">{selectedPost.author}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <span className="text-slate-400 uppercase tracking-wide font-bold">{t("labelCreatedAt")}</span>
            <span className="text-slate-700">{formatDate(selectedPost.createdAt)}</span>
          </div>
          {isExpired && (
            <div className="flex items-center gap-2 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100">
              <span className="text-rose-500 font-bold uppercase tracking-wide">Expired</span>
            </div>
          )}
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap mb-10 leading-relaxed text-base">
          {selectedPost.content}
        </div>
        
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button 
            onClick={() => setCurrentView('report')}
            className="text-rose-500 hover:text-rose-600 text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition bg-rose-50 px-4 py-2 rounded-lg border border-rose-100 hover:border-rose-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-8a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2h-2.5l-1.4 1.4a1 1 0 00-1.4-1.4l1.4-1.4H5a2 2 0 01-2-2z" /></svg>
            {t("buttonReport")}
          </button>
        </div>
      </div>

      {/* Report History */}
      {selectedPostReports.length > 0 && (
        <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-3xl">
          <h3 className="text-rose-400 font-bold mb-4 text-xs uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 bg-rose-400 rounded-full" />
            {t("labelReports")} ({selectedPostReports.length})
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {selectedPostReports.map(r => (
              <div key={r.id.toString()} className="text-sm text-rose-700 bg-white/50 p-3 rounded-xl border border-rose-100 shadow-sm">
                <span className="font-bold text-rose-400 text-xs block mb-1">{new Date(Number(r.createdAt)*1000).toLocaleDateString()}</span>
                {r.reason}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="bg-white/60 backdrop-blur-md border border-white/50 p-8 rounded-3xl shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          {t("labelComments")} 
          <span className="bg-indigo-100 text-indigo-600 text-xs font-bold py-1 px-2.5 rounded-full">{selectedPostComments.length}</span>
        </h3>
        
        <div className="space-y-4 mb-8">
          {selectedPostComments.map(comment => (
            <div key={comment.id.toString()} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">{comment.author.slice(0,8)}...</span>
                <span className="text-xs text-slate-400">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{comment.content}</p>
            </div>
          ))}
          {selectedPostComments.length === 0 && <p className="text-slate-400 text-sm italic text-center py-4">No comments yet.</p>}
        </div>

        {/* Add Comment */}
        {!isExpired ? (
          <div className="mt-6 pt-6 border-t border-slate-200/50">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3 block">{t("buttonReply")}</label>
            <div className="flex gap-4 items-start">
              <div className="flex-grow">
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition h-24 shadow-inner"
                  placeholder="..."
                />
              </div>
              <button 
                onClick={submitComment}
                disabled={loading || !newComment}
                className="bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-xl disabled:opacity-50 transition shadow-lg shadow-indigo-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 pt-6 border-t border-slate-200/50 text-center">
            <p className="text-slate-500 italic">This post has expired. Comments are closed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ReportView = ({
  selectedPost,
  t,
  reportReason,
  setReportReason,
  submitReport,
  loading,
  setCurrentView
}: {
  selectedPost: Post | null,
  t: (k: UiKey) => string,
  reportReason: string,
  setReportReason: (v: string) => void,
  submitReport: () => void,
  loading: boolean,
  setCurrentView: (v: string) => void
}) => {
  if (!selectedPost) return null;
  return (
    <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-xl border border-rose-200 p-8 rounded-3xl shadow-2xl shadow-rose-100 mt-12">
      <h2 className="text-2xl font-bold mb-2 text-rose-500 flex items-center gap-2">
        ⚠️ {t("buttonReport")} Post #{selectedPost.id.toString()}
      </h2>
      <p className="text-sm text-slate-500 mb-6 border-l-4 border-rose-200 pl-4 py-1 italic bg-rose-50/50 rounded-r-lg">
        "{selectedPost.title}"
      </p>
      
      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">{t("fieldReason")}</label>
      <textarea
        value={reportReason}
        onChange={e => setReportReason(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 h-32 mb-6 text-slate-800 focus:ring-2 focus:ring-rose-400 outline-none transition"
      />
      
      <div className="flex gap-4">
        <button 
          onClick={submitReport}
          disabled={loading || !reportReason}
          className="flex-1 bg-rose-500 text-white py-3 rounded-xl hover:bg-rose-400 disabled:opacity-50 font-bold transition shadow-lg shadow-rose-200"
        >
          {loading ? "..." : t("buttonSubmit")}
        </button>
        <button 
          onClick={() => setCurrentView('post-detail')}
          className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-xl hover:bg-slate-50 font-bold transition"
        >
          {t("buttonCancel")}
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const { t, language, setLanguage, hasSelectedLanguage, selectLanguage } = useTranslation();
  const [currentView, setCurrentView] = useState('home');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  
  // Data States
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedPostComments, setSelectedPostComments] = useState<Comment[]>([]);
  const [selectedPostReports, setSelectedPostReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form States
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostDate, setNewPostDate] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reportReason, setReportReason] = useState('');

  const ensureSepoliaChain = async () => {
    if (!window.ethereum) return;
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== SEPOLIA_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: SEPOLIA_CHAIN_ID,
                chainName: 'Sepolia',
                nativeCurrency: {
                  name: 'Sepolia Ether',
                  symbol: 'SEP',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc.sepolia.org'],
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              },
            ],
          });
        } else {
          throw switchError;
        }
      }
    }
  };

  const connectWallet = async () => {
    setError(null);
    if (window.ethereum) {
      try {
        setLoading(true);

        // Switch to Sepolia
        await ensureSepoliaChain();

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setWalletAddress(await signer.getAddress());
      } catch (err) {
        console.error(err);
        setError(t("errorWalletConnectFailed"));
      } finally {
        setLoading(false);
      }
    } else {
      setError(t("errorMetamaskMissing"));
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setCurrentView('home');
  };

  const getContract = async (withSigner = false) => {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    if (withSigner) {
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  };

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const rawPosts = await contract.getAllPosts();
      const formattedPosts: Post[] = rawPosts.map((p: any) => ({
        id: p.id,
        author: p.author,
        title: p.title,
        content: p.content,
        createdAt: p.createdAt,
        dueDate: p.dueDate,
        isDeleted: p.isDeleted
      })).filter((p: Post) => p.id !== 0n);
      setPosts(formattedPosts.reverse());
    } catch (err) {
      console.error(err);
      setError(t("errorWalletConnectFailed") + " (Check Network)");
    } finally {
      setLoading(false);
    }
  }, [t]);

  const createPost = async () => {
    if (!newPostTitle || !newPostContent) return;
    try {
      setLoading(true);
      await ensureSepoliaChain();
      const contract = await getContract(true);
      const dueDateTimestamp = newPostDate ? Math.floor(new Date(newPostDate).getTime() / 1000) : 0;
      const tx = await contract.createPost(newPostTitle, newPostContent, dueDateTimestamp);
      await tx.wait();
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostDate('');
      setCurrentView('post-list');
      fetchPosts();
    } catch (err) {
      console.error(err);
      setError("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  const loadPostDetails = async (post: Post) => {
    setSelectedPost(post);
    setLoading(true);
    try {
      const contract = await getContract();
      const comments = await contract.getCommentsByPost(post.id);
      const reports = await contract.getReportsByPost(post.id);
      setSelectedPostComments(comments);
      setSelectedPostReports(reports);
      setCurrentView('post-detail');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitComment = async () => {
    if (!selectedPost || !newComment) return;
    try {
      setLoading(true);
      await ensureSepoliaChain();
      const contract = await getContract(true);
      const tx = await contract.addComment(selectedPost.id, newComment);
      await tx.wait();
      setNewComment('');
      loadPostDetails(selectedPost);
    } catch (err) {
      console.error(err);
      setError("Comment failed");
    } finally {
      setLoading(false);
    }
  };

  const submitReport = async () => {
    if (!selectedPost || !reportReason) return;
    try {
      setLoading(true);
      await ensureSepoliaChain();
      const contract = await getContract(true);
      const tx = await contract.reportPost(selectedPost.id, reportReason);
      await tx.wait();
      setReportReason('');
      setCurrentView('post-detail');
      loadPostDetails(selectedPost);
    } catch (err) {
      console.error(err);
      setError("Report failed");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: bigint) => {
    if (Number(timestamp) === 0) return t("labelUnlimited");
    return new Date(Number(timestamp) * 1000).toLocaleString();
  };

  // 這裡把 && walletAddress 拿掉，切到 post-list 就會抓資料
  useEffect(() => {
    if (currentView === 'post-list') {
      fetchPosts();
    }
  }, [currentView, fetchPosts]);

  // --- Views ---

  // Home 主畫面
  const MainScreen = () => {
    const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
    const currentMsg = ON_CHAIN_MESSAGES[currentMsgIndex];

    return (
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-5xl w-full flex flex-col gap-10 md:grid md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-stretch">
          {/* 左邊主卡片 */}
          <section className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 px-8 py-10 md:px-10 relative overflow-hidden w-full">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100/70 blur-2xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-pink-100/60 blur-2xl" />

            <div className="relative h-full flex flex-col">
              <p className="text-xs uppercase tracking-[0.18em] text-indigo-500 font-semibold mb-3 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 text-sm">✨</span>
                {t("taglineHero")}
              </p>

              {/* 標題 + 右邊站著的貓 */}
              <div className="flex items-center gap-3 md:gap-4 mb-3">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                  {t("heroTitle")}
                </h1>
                <img
                  src="https://raw.githubusercontent.com/hanajangjangjang/Gist/main/social-cat.png"
                  alt="Hero Cat"
                  className="w-10 md:w-12 lg:w-14 drop-shadow-[0_10px_25px_rgba(15,23,42,0.4)] select-none pointer-events-none"
                />
              </div>

              <p className="text-[15px] md:text[17px] text-slate-700 font-medium mb-6 leading-relaxed">
                {t("heroSubtitle")}
              </p>

              {/* 這裡改成不用先連 MetaMask，也可以直接進下一步 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                <button
                  onClick={() => setCurrentView('post-list')}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white
                             bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-400
                             shadow-lg shadow-sky-300/60 hover:shadow-sky-400/70
                             hover:-translate-y-[1px] active:translate-y-0 transition"
                >
                  {t("navViewPosts")}
                </button>

                <button
                  onClick={() => setCurrentView('new-post')}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold
                             text-indigo-600 bg-white border border-indigo-100 shadow-md hover:bg-indigo-50 transition"
                >
                  {t("navNewPost")}
                </button>

                {!walletAddress && (
                  <p className="text-[13px] text-slate-600 font-medium sm:ml-3 mt-1 sm:mt-0">
                    {t("connectHint")}
                  </p>
                )}
              </div>

              <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex -space-x-2">
                  <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 text-white flex items-center justify-center text-xs shadow-sm ring-2 ring-white">🙂</span>
                  <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 text-white flex items-center justify-center text-xs shadow-sm ring-2 ring-white">🌱</span>
                  <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-xs shadow-sm ring-2 ring-white">🧡</span>
                </div>
                <p className="text-[13px] text-slate-600 font-medium">
                  {t("communityWarmLine")}
                </p>
              </div>
            </div>
          </section>

          {/* 右邊：鏈上今日卡片，高度跟左邊一樣 */}
          <aside className="w-full h-full flex items-stretch justify-center md:justify-end">
            <div className="relative w-full max-w-xs h-full">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-200 via-sky-100 to-pink-100 shadow-lg rotate-3" />
              <div className="absolute inset-0 rounded-3xl bg-white/80 backdrop-blur-md border border-white/60 p-5 flex flex-col gap-3 shadow-sm rotate-0">
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm shadow-sm shrink-0">🗨️</span>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-semibold text-slate-700 truncate">{t(currentMsg.titleKey)}</span>
                    <span className="text-[10px] text-slate-400 truncate">{t(currentMsg.subtitleKey)}</span>
                  </div>
                </div>

                <div className="flex-1 rounded-2xl bg-slate-50/80 border border-slate-100 p-4 text-xs text-slate-600 leading-relaxed italic overflow-y-auto custom-scrollbar">
                  "{t(currentMsg.contentKey)}"
                </div>

                <div className="mt-auto flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[120px]">◎ {t(currentMsg.footnoteKey)}</span>
                  <div className="flex gap-1.5 ml-2">
                    {ON_CHAIN_MESSAGES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentMsgIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentMsgIndex === idx 
                            ? 'w-4 bg-indigo-500' 
                            : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  };



  const PostListView = () => (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="flex justify-between items-center mb-8 px-2">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{t("postListTitle")}</h2>
        <button onClick={fetchPosts} className="text-indigo-500 hover:text-indigo-600 text-sm font-semibold flex items-center gap-1 transition bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Refresh
        </button>
      </div>
      
      {loading && <div className="text-center text-indigo-600 font-bold py-8 animate-pulse">Loading data...</div>}
      
      <div className="grid gap-6">
        {posts.map(post => (
          <div key={post.id.toString()} className="bg-white/70 backdrop-blur-md border border-white/60 p-6 rounded-2xl hover:bg-white/90 hover:shadow-lg transition-all duration-300 group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition">{post.title}</h3>
              <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md">#{post.id.toString()}</span>
            </div>
            <div className="text-xs text-slate-500 mb-5 flex gap-4 flex-wrap items-center">
              <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                <span className="font-semibold">{t("labelAuthor")}:</span> 
                <span className="font-mono text-indigo-500">{post.author.slice(0,6)}...</span>
              </span>
              <span>{t("labelCreatedAt")}: {formatDate(post.createdAt)}</span>
              {Number(post.dueDate) > 0 && (
                <>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-orange-500 font-medium">{t("labelDueDate")}: {formatDate(post.dueDate)}</span>
                </>
              )}
            </div>
            <button 
              onClick={() => loadPostDetails(post)}
              className="text-sm font-bold text-indigo-500 hover:text-indigo-700 transition flex items-center gap-1"
            >
              {t("buttonViewDetail")} &rarr;
            </button>
          </div>
        ))}
        {!loading && posts.length === 0 && (
          <div className="text-center py-20 bg-white/40 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg">No posts yet.</p>
            <button onClick={() => setCurrentView('new-post')} className="mt-4 text-indigo-500 font-semibold hover:underline">Create the first one</button>
          </div>
        )}
      </div>
    </div>
  );



  if (!hasSelectedLanguage) {
    return <LanguageSelectionScreen onSelect={selectLanguage} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-indigo-400 to-rose-300 text-slate-900 font-sans selection:bg-indigo-200 selection:text-indigo-900 flex flex-col">
      <Navbar 
        address={walletAddress} 
        onConnect={connectWallet} 
        onDisconnect={disconnectWallet}
        loading={loading}
        currentView={currentView} 
        setView={setCurrentView}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      
      <main className="flex-grow container mx-auto p-4 md:p-6">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 px-6 py-4 rounded-2xl relative mb-8 shadow-sm flex items-center gap-3" role="alert">
            <span className="text-xl">⚠️</span>
            <span className="block sm:inline font-medium text-sm">{error}</span>
          </div>
        )}

        {currentView === 'home' && <MainScreen />}
        {currentView === 'new-post' && (
          <NewPostView
            t={t}
            newPostTitle={newPostTitle}
            setNewPostTitle={setNewPostTitle}
            newPostContent={newPostContent}
            setNewPostContent={setNewPostContent}
            newPostDate={newPostDate}
            setNewPostDate={setNewPostDate}
            createPost={createPost}
            loading={loading}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView === 'post-list' && <PostListView />}
        {currentView === 'post-detail' && (
          <PostDetailView
            selectedPost={selectedPost}
            t={t}
            setCurrentView={setCurrentView}
            formatDate={formatDate}
            selectedPostReports={selectedPostReports}
            selectedPostComments={selectedPostComments}
            newComment={newComment}
            setNewComment={setNewComment}
            submitComment={submitComment}
            loading={loading}
          />
        )}
        {currentView === 'report' && (
          <ReportView
            selectedPost={selectedPost}
            t={t}
            reportReason={reportReason}
            setReportReason={setReportReason}
            submitReport={submitReport}
            loading={loading}
            setCurrentView={setCurrentView}
          />
        )}
      </main>

      {/* 大躺貓：在 footer 正上方，所有畫面共用 */}
      <div className="w-full flex justify-center mt-4 md:mt-8">
        <img
          src="https://raw.githubusercontent.com/hanajangjangjang/Gist/main/social-cat_main.png"
          alt="Social Responsibility Main Cat"
          className="w-60 md:w-80 lg:w-[420px] drop-shadow-[0_24px_55px_rgba(15,23,42,0.65)] select-none pointer-events-none"
        />
      </div>

      <Footer t={t} />
    </div>
  );
}
