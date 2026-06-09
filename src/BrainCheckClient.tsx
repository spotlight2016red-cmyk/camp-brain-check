import { useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Brain, Camera, MessageCircle } from 'lucide-react';
import { QUESTIONS, ANSWER_LABELS } from './questions';
import { calculateAxisScores, determineResult, getMaxScorePerAxis } from './scoring';
import { AXES, AXIS_ORDER } from './types';
import { CAMP_LP_URL, LINE_URL } from './config';

type Step = 'intro' | 'quiz' | 'result';

export function BrainCheckClient() {
  const [step, setStep] = useState<Step>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + (step === 'result' ? 1 : 0)) / QUESTIONS.length) * 100;
  const axisScores = calculateAxisScores(answers);
  const result = determineResult(axisScores);
  const maxScore = getMaxScorePerAxis();

  const handleAnswer = (value: number) => {
    if (!currentQuestion) return;
    setAnswers({ ...answers, [currentQuestion.id]: value });
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep('result');
    }
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentIndex(0);
    setAnswers({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5EB] to-[#F5F0E8]">
      <header className="bg-white border-b border-[#FFE5D0] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href={CAMP_LP_URL}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF9966] text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            合宿LPへ
          </a>
          <div className="inline-flex items-center gap-2 text-gray-800 font-medium text-sm">
            <Brain className="w-5 h-5 text-[#FF9966]" />
            合宿前・簡易診断
          </div>
        </div>
        {step === 'quiz' && (
          <div className="h-1.5 bg-[#FFE5D0]">
            <div
              className="h-full bg-gradient-to-r from-[#FF9966] to-[#FFB366] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {step === 'intro' && (
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#FFE5D0] px-4 py-2 rounded-full text-sm text-gray-700">
              全24問・約5分・ログイン不要
            </div>
            <h1 className="text-3xl md:text-4xl text-gray-800 font-bold leading-tight">
              脳内アップデート合宿<br />
              <span className="text-[#FF9966]">事前簡易診断</span>
            </h1>
            <p className="text-gray-600 leading-relaxed text-left bg-white rounded-2xl p-6 shadow-md border-2 border-[#FFE5D0]">
              合宿申込者向けの事前診断です。24問の回答から、あなたの考え方・反応・力が出やすい環境の傾向を仮で見える化します。
            </p>
            <ul className="text-left text-gray-600 space-y-2 text-sm bg-white/60 rounded-xl p-5">
              <li>・6つの軸で集計（直感性・構造化・行動性・共感性・表現性・安定性）</li>
              <li>・上位2軸から8タイプの仮判定</li>
              <li>・タイプ別の初期アバターと説明を表示</li>
            </ul>
            <button
              onClick={() => setStep('quiz')}
              className="bg-[#FF9966] hover:bg-[#FF8850] text-white px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 text-lg"
            >
              診断をはじめる
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 'quiz' && currentQuestion && (
          <div className="space-y-8">
            <p className="text-center text-sm text-[#FF9966] font-medium">
              質問 {currentIndex + 1} / {QUESTIONS.length}
            </p>
            <h2 className="text-xl md:text-2xl text-gray-800 text-center leading-relaxed font-medium">
              {currentQuestion.text}
            </h2>
            <div className="space-y-3">
              {ANSWER_LABELS.map((label, index) => (
                <button
                  key={label}
                  onClick={() => handleAnswer(index + 1)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    answers[currentQuestion.id] === index + 1
                      ? 'border-[#FF9966] bg-[#FFF5EB] shadow-md'
                      : 'border-gray-100 bg-white hover:border-[#FFE5D0]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="text-gray-500 hover:text-gray-700 text-sm mx-auto block"
              >
                ← 前の質問に戻る
              </button>
            )}
          </div>
        )}

        {step === 'result' && (
          <div className="space-y-8" id="diagnosis-result">
            <div className="text-center">
              <p className="text-sm text-[#FF9966] font-medium mb-2">あなたの仮タイプ</p>
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">{result.typeName}</h1>
              <p className="text-xl text-[#FF9966] font-medium mt-1">{result.avatarName}</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-[#FFE5D0] text-center">
              <img src={result.avatarImage} alt={result.avatarName} className="w-40 h-40 mx-auto mb-4" />
              <p className="text-gray-700 leading-relaxed text-left">{result.description}</p>
            </div>

            <ResultBlock title="力が出やすい環境" content={result.strongEnvironment} />
            <ResultBlock title="疲れやすいパターン" content={result.fatiguePattern} />
            <ResultBlock title="合宿で深掘りしたいポイント" content={result.deepDivePoint} highlight />

            <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">6軸スコア</h3>
              <div className="space-y-4">
                {AXIS_ORDER.map((key) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{AXES[key].label}</span>
                      <span className="text-gray-500">{axisScores[key]} / {maxScore}</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(axisScores[key] / maxScore) * 100}%`,
                          backgroundColor: AXES[key].color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <InfoCard
              icon={<Camera className="w-6 h-6 text-[#66BB6A]" />}
              title="結果画面のスクショ保存"
              className="bg-[#E8F5E9] border-[#C8E6C9]"
            >
              この画面をスクリーンショットで保存しておくと、合宿当日の振り返りに役立ちます。
            </InfoCard>

            <InfoCard
              icon={<MessageCircle className="w-6 h-6 text-[#42A5F5]" />}
              title="LINEで事前送付"
              className="bg-[#E3F2FD] border-[#BBDEFB]"
            >
              <p className="text-sm text-gray-600 mb-3">
                診断結果のスクリーンショットを、合宿事務局のLINEに送ってください。
              </p>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white px-5 py-2.5 rounded-full text-sm font-medium"
              >
                LINEで結果を送る
                <ArrowRight className="w-4 h-4" />
              </a>
            </InfoCard>

            <p className="text-xs text-gray-500 text-center leading-relaxed px-4">
              ※ 診断結果はあなたを決めつけるものではありません。
              あくまで合宿前の「仮の地図」として、自分を知る入口にお使いください。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-full border-2 border-[#FFE5D0] text-gray-700 hover:bg-white"
              >
                もう一度診断する
              </button>
              <a
                href={CAMP_LP_URL}
                className="px-6 py-3 rounded-full bg-[#FF9966] hover:bg-[#FF8850] text-white text-center"
              >
                合宿LPに戻る
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ResultBlock({
  title,
  content,
  highlight = false,
}: {
  title: string;
  content: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 border-2 ${
        highlight ? 'bg-gradient-to-r from-[#FFF5EB] to-[#FFE5D0] border-[#FF9966]' : 'bg-white border-gray-100 shadow-sm'
      }`}
    >
      <h3 className="font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  className,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-2xl p-5 border-2 flex gap-3 ${className}`}>
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
        <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
