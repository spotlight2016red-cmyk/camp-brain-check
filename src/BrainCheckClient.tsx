import { useState } from 'react';
import { ArrowLeft, ArrowRight, Brain, ChevronDown } from 'lucide-react';
import { MAIN_QUESTIONS, DIAGNOSIS_INTRO, TOTAL_QUESTIONS } from './questions';
import { calculateAxisScores, determineOutcome, getMaxScorePerAxis } from './scoring';
import { AXES, AXIS_ORDER } from './types';
import { CAMP_LP_URL, LINE_URL } from './config';
import { getAvatarImageUrl } from './avatarImages';
import { getTypeCardImageUrl } from './typeCardImages';
import { SUB_TYPE_OPTIONS, SUB_TYPE_QUESTION_TEXT } from './subTypeQuestion';
import type { BrainTypeId } from './types';

type Step = 'intro' | 'quiz' | 'subtype' | 'result';

export function BrainCheckClient() {
  const [step, setStep] = useState<Step>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [subTypeId, setSubTypeId] = useState<BrainTypeId | null>(null);

  const currentQuestion = MAIN_QUESTIONS[currentIndex];
  const quizStep =
    step === 'quiz'
      ? currentIndex + 1
      : step === 'subtype'
        ? MAIN_QUESTIONS.length + 1
        : TOTAL_QUESTIONS;
  const progress = (quizStep / TOTAL_QUESTIONS) * 100;

  const axisScores = calculateAxisScores(answers);
  const outcome =
    subTypeId !== null ? determineOutcome(answers, subTypeId) : null;
  const result = outcome?.result;
  const maxScore = getMaxScorePerAxis();
  const typeCardUrl = result ? getTypeCardImageUrl(result.id) : null;
  const avatarUrl = result ? getAvatarImageUrl(result.id) : null;

  const handleAnswer = (value: number) => {
    if (!currentQuestion) return;
    setAnswers({ ...answers, [currentQuestion.id]: value });
    if (currentIndex < MAIN_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep('subtype');
    }
  };

  const handleSubTypeAnswer = (typeId: BrainTypeId) => {
    setSubTypeId(typeId);
    setStep('result');
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentIndex(0);
    setAnswers({});
    setSubTypeId(null);
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
        {(step === 'quiz' || step === 'subtype') && (
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
              全18問+1問・約5分・ログイン不要
            </div>
            <h1 className="text-3xl md:text-4xl text-gray-800 font-bold leading-tight">
              脳内アップデート合宿<br />
              <span className="text-[#FF9966]">事前簡易診断</span>
            </h1>
            <p className="text-gray-600 leading-relaxed text-left bg-white rounded-2xl p-6 shadow-md border-2 border-[#FFE5D0]">
              合宿にお申し込みいただいた方向けの、合宿前の簡易診断です。
              18問の回答と、最後の1問から、あなたの考え方・反応・力が出やすい環境の傾向を仮で見える化します。
            </p>
            <div className="text-left text-gray-600 leading-relaxed text-sm bg-white/80 rounded-2xl p-6 border-2 border-[#FFE5D0] whitespace-pre-line">
              {DIAGNOSIS_INTRO}
            </div>
            <button
              onClick={() => setStep('quiz')}
              className="bg-[#FF9966] hover:bg-[#FF8850] text-white px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 text-lg"
            >
              診断をはじめる
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 'subtype' && (
          <div className="space-y-8">
            <p className="text-center text-sm text-[#FF9966] font-medium">
              質問 {TOTAL_QUESTIONS} / {TOTAL_QUESTIONS}
            </p>
            <h2 className="text-xl md:text-2xl text-gray-800 text-center leading-relaxed font-medium">
              {SUB_TYPE_QUESTION_TEXT}
            </h2>
            <p className="text-center text-sm text-gray-500 leading-relaxed">
              ここでは、今の自分に一番近いと感じる要素を選んでください。
              これは補助資質・サブ要因として、結果に一緒に記録されます。
            </p>
            <div className="space-y-3">
              {SUB_TYPE_OPTIONS.map((option, index) => (
                <button
                  key={option.typeId}
                  onClick={() => handleSubTypeAnswer(option.typeId)}
                  className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 bg-white hover:border-[#FFE5D0] hover:bg-[#FFF5EB] transition-all"
                >
                  <span className="text-[#FF9966] text-xs font-medium mr-2">{index + 1}.</span>
                  {option.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('quiz')}
              className="text-gray-500 hover:text-gray-700 text-sm mx-auto block"
            >
              ← 前の質問に戻る
            </button>
          </div>
        )}

        {step === 'quiz' && currentQuestion && (
          <div className="space-y-8">
            <p className="text-center text-sm text-[#FF9966] font-medium">
              質問 {currentIndex + 1} / {TOTAL_QUESTIONS}
            </p>
            <h2 className="text-xl md:text-2xl text-gray-800 text-center leading-relaxed font-medium">
              {currentQuestion.text}
            </h2>
            <div className="space-y-3">
              {currentQuestion.options.map((label, index) => (
                <button
                  key={label}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    answers[currentQuestion.id] === index
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

        {step === 'result' && outcome && result && (
          <div className="space-y-8" id="diagnosis-result">
            <section
              id="type-card-screenshot"
              className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border-4 border-[#FFE5D0]"
            >
              <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">
                あなたのタイプカード
              </h2>
              {typeCardUrl ? (
                <img
                  src={typeCardUrl}
                  alt={`${result.typeName}のタイプカード`}
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-md"
                />
              ) : (
                <div className="w-full max-w-lg mx-auto rounded-2xl border-2 border-dashed border-[#FFE5D0] bg-[#FFF5EB]/60 px-6 py-12 text-center">
                  <Brain className="w-12 h-12 text-[#FF9966] mx-auto mb-3" />
                  <p className="text-gray-700 text-sm leading-relaxed">
                    下の結果画面をスクショして保存してください。
                  </p>
                </div>
              )}
              <div className="mt-6 space-y-3 text-center">
                <p className="text-gray-800 font-medium">
                  {typeCardUrl
                    ? 'このカードをスクショして保存してください'
                    : 'この画面をスクショして保存してください'}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  可能であればLINEで結果を送ってください
                </p>
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white px-6 py-3 rounded-full text-sm font-medium"
                >
                  LINEで結果を送る
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </section>

            <section className="bg-white rounded-2xl p-5 border-2 border-[#FFE5D0] shadow-sm space-y-5">
              <p className="text-sm text-[#FF9966] font-medium text-center">
                {outcome.patternType === 'matched' ? '一致型' : '複合型'}
              </p>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.1)] ring-2 ring-[#FFE5D0]/60 bg-[#FFF5EB] flex items-center justify-center">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={result.avatarName}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <Brain className="w-9 h-9 text-[#FF9966]" aria-hidden />
                  )}
                </div>
                <div className="min-w-0 text-left space-y-3">
                  <div>
                    <p className="text-gray-500 text-xs font-medium mb-1">メインタイプ</p>
                    <p className="text-lg font-bold text-gray-800 leading-snug">{result.typeName}</p>
                    <p className="text-[#FF9966] font-medium text-sm mt-0.5">{result.avatarName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium mb-1">サブタイプ</p>
                    <p className="text-gray-800 font-medium leading-snug">{outcome.subTypeName}</p>
                  </div>
                </div>
              </div>

              <ResultBlock title="メインタイプの説明" content={outcome.mainTypeDescription} />
              <ResultBlock
                title="サブタイプ（補助資質）"
                subtitle="本人が選んだサブ要因として働く傾向"
                content={outcome.subTypeDescription}
              />
              <ResultBlock
                title="組み合わせの説明"
                content={outcome.combinedDescription}
                highlight
              />
              {outcome.patternType === 'matched' ? (
                <p className="text-gray-500 text-xs leading-relaxed">
                  メインタイプとサブタイプが重なっています。自分でもその資質をある程度自覚しており、自然に出やすい傾向として表れやすい状態です。次のテーマは「どう活かすか」「どこで使うか」です。
                </p>
              ) : (
                <p className="text-gray-500 text-xs leading-relaxed">
                  メインタイプは表に出やすい反応パターン、サブタイプは内側で自覚している補助資質です。どちらかが正しいというより、両方を組み合わせることで、あなたらしさが立体的に見えてきます。
                </p>
              )}
            </section>

            <details className="group bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
              <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none font-medium text-gray-800 select-none [&::-webkit-details-marker]:hidden">
                詳しく知りたい方へ
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
                <ResultBlock
                  title="力が出やすい環境"
                  subtitle="こういう時に能力を発揮しやすい"
                  content={result.strongEnvironment!}
                />
                <ResultBlock
                  title="疲れやすいパターン"
                  subtitle="こういう時に失敗しやすい"
                  content={result.fatiguePattern!}
                />
                <ResultBlock title="今後の活かし方" content={result.practicalUsage!} />
                <ResultBlock
                  title="合宿で深掘りしたいポイント"
                  content={result.deepDivePoint!}
                  highlight
                />
                <div className="rounded-2xl p-5 border-2 bg-white border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-4">6軸スコア</h3>
                  <div className="space-y-4">
                    {AXIS_ORDER.map((key) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{AXES[key].label}</span>
                          <span className="text-gray-500">
                            {axisScores[key]} / {maxScore}
                          </span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${maxScore > 0 ? (axisScores[key] / maxScore) * 100 : 0}%`,
                              backgroundColor: AXES[key].color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </details>

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
  subtitle,
  content,
  highlight = false,
}: {
  title: string;
  subtitle?: string;
  content: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 border-2 ${
        highlight
          ? 'bg-gradient-to-r from-[#FFF5EB] to-[#FFE5D0] border-[#FF9966]'
          : 'bg-white border-gray-100'
      }`}
    >
      <h3 className="font-medium text-gray-800">{title}</h3>
      {subtitle && <p className="text-xs text-[#FF9966] mt-1">{subtitle}</p>}
      <p className="text-gray-600 text-sm leading-relaxed mt-2 whitespace-pre-line">{content}</p>
    </div>
  );
}
