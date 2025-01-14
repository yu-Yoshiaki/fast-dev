"use client"

import { useState, useEffect } from 'react';
import { 
  Brain, 
  Calendar,
  MessageSquare,
  CheckSquare,
  Rocket,
  Shield,
  Clock,
  Zap,
  ArrowRight,
  ChevronRight,
  BarChart3,
  Users,
  Target,
  Sparkles,
  LineChart,
  PieChart,
  Bot,
  Lightbulb,
  Star,
  Award,
  TrendingUp,
  Cpu,
  Code,
  Layers,
  Settings,
  Share2,
  Repeat
} from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  const dashboardTabs = [
    {
      title: "ビジネス分析",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      features: [
        { icon: <LineChart className="w-5 h-5" />, text: "売上トレンド分析" },
        { icon: <Users className="w-5 h-5" />, text: "顧客行動分析" },
        { icon: <TrendingUp className="w-5 h-5" />, text: "成長予測" }
      ]
    },
    {
      title: "プロジェクト管理",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      features: [
        { icon: <Layers className="w-5 h-5" />, text: "タスク最適化" },
        { icon: <Share2 className="w-5 h-5" />, text: "チーム連携" },
        { icon: <Clock className="w-5 h-5" />, text: "進捗管理" }
      ]
    },
    {
      title: "AI戦略立案",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80",
      features: [
        { icon: <Cpu className="w-5 h-5" />, text: "市場分析" },
        { icon: <Code className="w-5 h-5" />, text: "戦略提案" },
        { icon: <Settings className="w-5 h-5" />, text: "運用最適化" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg group-hover:bg-blue-500/30 transition-all duration-300"></div>
                <Brain className="w-8 h-8 text-blue-400 relative" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                AI COO
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <NavLink>機能</NavLink>
              <NavLink>料金</NavLink>
              <NavLink>導入事例</NavLink>
              <NavLink>サポート</NavLink>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300">
                ログイン
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-4 py-2 rounded-lg transition-all duration-300">
                無料で始める
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient-xy"></div>
        <div className="container mx-auto px-6 pt-12 pb-32">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block mb-8 relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
                  <Brain className="w-16 h-16 text-white" />
                </div>
              </div>
              <h1 className="text-7xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  想像を超える
                  <br />
                  ビジネスの進化
                </span>
                <br />
                <span className="text-3xl text-gray-200 mt-4 block">
                  <span className="text-blue-400">AI COO</span>が実現する
                  <br />
                  次世代の経営革新
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl">
                人工知能が、ビジネスの可能性を無限に広げる。
                <br />
                戦略立案から実行まで、あなたのビジネスを加速する革新的なソリューション。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group relative bg-gradient-to-r from-blue-500 to-purple-500 p-px rounded-lg transform hover:scale-105 transition-all duration-300">
                  <div className="relative bg-slate-900 rounded-lg">
                    <div className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:opacity-0 transition-opacity font-bold flex items-center gap-2">
                      無料トライアルを開始
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      今すぐ始める
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
                <button className="relative overflow-hidden bg-white/10 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-white/20">
                  <span className="relative z-10 flex items-center gap-2">
                    詳細を見る
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/10 relative">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      限定オファー
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-center">今すぐ始める</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        メールアドレス
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300 group"
                    >
                      無料トライアルを開始 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                  <div className="mt-6 space-y-4">
                    <BenefitPoint icon={<Star className="w-4 h-4" />} text="14日間無料トライアル" />
                    <BenefitPoint icon={<Shield className="w-4 h-4" />} text="クレジットカード不要" />
                    <BenefitPoint icon={<Repeat className="w-4 h-4" />} text="いつでもキャンセル可能" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </header>

      {/* Stats Section */}
      <section className="relative -mt-16 mb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
              icon={<Award className="w-8 h-8" />}
              number="10,000+"
              label="導入企業数"
              description="国内外の企業で導入実績"
            />
            <StatCard
              icon={<Target className="w-8 h-8" />}
              number="98%"
              label="目標達成率"
              description="高い目標達成をサポート"
            />
            <StatCard
              icon={<TrendingUp className="w-8 h-8" />}
              number="2.5x"
              label="生産性向上"
              description="平均的な生産性の向上率"
            />
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm font-semibold mb-4">
              革新的な機能
            </span>
            <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              次世代のビジネス革新
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              最新のAI技術を駆使して、ビジネスの効率化と成長を支援します
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="w-8 h-8 text-blue-400" />}
              title="AIアシスタント"
              description="24時間365日、あなたのビジネスをサポートする専属のAIアシスタント"
              benefits={["リアルタイムサポート", "多言語対応", "カスタマイズ可能"]}
            />
            <FeatureCard
              icon={<Lightbulb className="w-8 h-8 text-blue-400" />}
              title="アイデア共創"
              description="AIがビジネスアイデアを分析し、新しい視点と可能性を提案"
              benefits={["市場分析", "競合調査", "実現可能性評価"]}
            />
            <FeatureCard
              icon={<LineChart className="w-8 h-8 text-blue-400" />}
              title="データ分析"
              description="ビジネスデータをリアルタイムで分析し、最適な意思決定をサポート"
              benefits={["予測分析", "レポート自動生成", "KPI管理"]}
            />
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 bg-gradient-to-b from-blue-900/30 to-slate-900/30 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm font-semibold mb-4">
              直感的なインターフェース
            </span>
            <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              パワフルなダッシュボード
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              必要な情報をすべて一画面に。直感的な操作で、ビジネスの全体像を把握
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-x-0 -top-40 -bottom-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-[40px] blur-3xl"></div>
            <div className="relative">
              <div className="flex justify-center mb-8">
                <div className="inline-flex bg-white/5 backdrop-blur-lg rounded-full p-1">
                  {dashboardTabs.map((tab, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`px-6 py-2 rounded-full transition-all duration-300 ${
                        activeTab === index
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={dashboardTabs[activeTab].image}
                  alt={dashboardTabs[activeTab].title}
                  className="rounded-xl shadow-2xl border border-white/10 transform group-hover:scale-105 transition-all duration-500 w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="grid grid-cols-3 gap-4">
                    {dashboardTabs[activeTab].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-lg rounded-lg p-3">
                        {feature.icon}
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1">
              <span className="inline-block px-4 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm font-semibold mb-4">
                高度な分析機能
              </span>
              <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                データドリブンな意思決定
              </h2>
              <div className="space-y-6">
                <AnalyticsFeature
                  icon={<TrendingUp className="w-6 h-6" />}
                  title="予測分析"
                  description="AIが過去のデータから将来のトレンドを予測し、先手を打った戦略立案をサポート"
                />
                <AnalyticsFeature
                  icon={<BarChart3 className="w-6 h-6" />}
                  title="パフォーマンス分析"
                  description="ビジネスの各側面のパフォーマンスを詳細に分析し、改善点を提案"
                />
                <AnalyticsFeature
                  icon={<Users className="w-6 h-6" />}
                  title="市場分析"
                  description="競合分析や市場動向の分析により、ビジネスチャンスを特定"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                  alt="Analytics Charts"
                  className="rounded-xl shadow-2xl border border-white/10 transform group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient-xy"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/10">
              <div className="text-center">
                <span className="inline-block px-4 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm font-semibold mb-4">
                  始める準備はできましたか？
                </span>
                <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  ビジネスの未来を創造する
                  <br />
                  新しい一歩を
                </h2>
                <p className="text-xl text-gray-300 mb-12">
                  AI COOと共に、あなたのビジネスを次のレベルへ。
                  <br />
                  今すぐ無料トライアルを開始して、革新的なビジネス体験を。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group relative bg-gradient-to-r from-blue-500 to-purple-500 p-px rounded-lg transform hover:scale-105 transition-all duration-300">
                    <div className="relative bg-slate-900 rounded-lg">
                      <div className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:opacity-0 transition-opacity font-bold flex items-center gap-2">
                        無料トライアルを開始
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                        今すぐ始める
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                  <button className="relative overflow-hidden bg-white/10 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-white/20">
                    <span className="relative z-10 flex items-center gap-2">
                      詳細を見る
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg group-hover:bg-blue-500/30 transition-all duration-300"></div>
                  <Brain className="w-6 h-6 text-blue-400 relative" />
                </div>
                <span className="text-lg font-bold">AI COO</span>
              </div>
              <p className="text-gray-400 text-sm">
                ビジネスの成長をAIで加速する
                <br />
                次世代のビジネスパートナー
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">製品</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">機能一覧</li>
                <li className="hover:text-white transition-colors cursor-pointer">料金プラン</li>
                <li className="hover:text-white transition-colors cursor-pointer">導入事例</li>
                <li className="hover:text-white transition-colors cursor-pointer">お知らせ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">サポート</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">ヘルプセンター</li>
                <li className="hover:text-white transition-colors cursor-pointer">お問い合わせ</li>
                <li className="hover:text-white transition-colors cursor-pointer">セキュリティ</li>
                <li className="hover:text-white transition-colors cursor-pointer">開発者向け</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">会社</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">会社概要</li>
                <li className="hover:text-white transition-colors cursor-pointer">採用情報</li>
                <li className="hover:text-white transition-colors cursor-pointer">プライバシーポリシー</li>
                <li className="hover:text-white transition-colors cursor-pointer">利用規約</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 AI COO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ children }: { children: React.ReactNode }) {
  return (
    <a href="#" className="text-gray-300 hover:text-white transition-colors">
      {children}
    </a>
  );
}

function StatCard({ icon, number, label, description }: { icon: React.ReactNode; number: string; label: string; description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-all duration-300 group">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold">{number}</div>
          <div className="text-gray-400 text-sm">{label}</div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-400">{description}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description, benefits }: { icon: React.ReactNode; title: string; description: string; benefits: string[] }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 group">
      <div className="mb-6 p-3 bg-blue-500/20 rounded-lg inline-block group-hover:bg-blue-500/30 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
            <CheckSquare className="w-4 h-4 text-blue-400" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnalyticsFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 mt-1">
        <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
       </div>
    </div>
  );
}

function BenefitPoint({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <div className="text-blue-400">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );
}

export default App;