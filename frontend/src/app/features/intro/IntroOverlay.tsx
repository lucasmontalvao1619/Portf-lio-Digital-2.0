import { useEffect, useRef, useState } from "react";

// ── Configuração da intro (edite livremente) ─────────────────────────────
// Comando digitado no terminal:
const COMMAND = "./lucas-montalvao --portfolio";

// Linhas de "boot" exibidas após o Enter:
const BOOT_LINES = [
  { text: "inicializando módulos", status: "ok" },
  { text: "carregando interface", status: "ok" },
  { text: "abrindo portfólio", status: "" },
] as const;

// Mensagem final antes de revelar o site:
const WELCOME = "seja bem vindo(a) ao meu portfólio digital";

// Duração total do terminal antes de fechar sozinho e ir para o site (ms):
const DURATION_MS = 2500;

// Tempos (ms) de cada etapa da sequência (o "hold" final é calculado
// automaticamente para que a soma sempre bata com DURATION_MS):
const TIMING_STEPS = {
  open: 280,         // pausa inicial com o terminal já na tela
  typeStart: 140,    // pausa antes de começar a digitar
  perChar: 22,       // velocidade de digitação (por caractere)
  enterPause: 170,   // pausa entre o comando e a primeira linha de boot
  perLine: 170,      // intervalo entre linhas de boot
  welcomePause: 160, // pausa antes da mensagem de boas-vindas
  textFade: 240,     // saída, etapa 1: o texto do terminal se dissolve
  slide: 750,        // saída, etapa 2: a tela preta desliza para cima revelando o site
} as const;

// Cores do terminal:
const COLOR = {
  background: "#020402",
  titleBar: "#0a0f0a",
  border: "rgba(74, 222, 128, 0.16)",
  green: "#4ade80",
  greenDim: "rgba(74, 222, 128, 0.55)",
  greenFaint: "rgba(74, 222, 128, 0.3)",
} as const;
// ─────────────────────────────────────────────────────────────────────────

const TYPE_START = TIMING_STEPS.open + TIMING_STEPS.typeStart;
const TYPE_END = TYPE_START + COMMAND.length * TIMING_STEPS.perChar;
const BOOT_START = TYPE_END + TIMING_STEPS.enterPause;
const WELCOME_AT = BOOT_START + BOOT_LINES.length * TIMING_STEPS.perLine + TIMING_STEPS.welcomePause;
const CLOSE_START = Math.max(DURATION_MS, WELCOME_AT + 200);

// Libera a página quando o terminal sai de cena (o index.html pinta o fundo
// de preto antes do React carregar, para não haver nenhum frame do site):
function releasePage() {
  document.documentElement.style.overflow = "";
  document.documentElement.style.backgroundColor = "transparent";
}

export function IntroOverlay() {
  // Começa ativo já no primeiro render — o site nunca aparece antes do terminal.
  const [active, setActive] = useState(true);
  const [typedChars, setTypedChars] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    const schedule = (fn: () => void, delay: number) => {
      timers.current.push(window.setTimeout(fn, delay));
    };

    for (let i = 1; i <= COMMAND.length; i++) {
      schedule(() => setTypedChars(i), TYPE_START + i * TIMING_STEPS.perChar);
    }
    for (let i = 1; i <= BOOT_LINES.length; i++) {
      schedule(() => setVisibleLines(i), BOOT_START + i * TIMING_STEPS.perLine);
    }
    schedule(() => setWelcomeVisible(true), WELCOME_AT);
    schedule(() => setClosing(true), CLOSE_START);
    schedule(() => setLeaving(true), CLOSE_START + TIMING_STEPS.textFade);
    schedule(() => {
      setActive(false);
      releasePage();
    }, CLOSE_START + TIMING_STEPS.textFade + TIMING_STEPS.slide);

    return () => {
      for (const id of timers.current) window.clearTimeout(id);
      timers.current = [];
      releasePage();
    };
  }, []);

  const skip = () => {
    if (closing) return;
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
    setClosing(true);
    timers.current.push(window.setTimeout(() => setLeaving(true), TIMING_STEPS.textFade));
    timers.current.push(window.setTimeout(() => {
      setActive(false);
      releasePage();
    }, TIMING_STEPS.textFade + TIMING_STEPS.slide));
  };

  if (!active) return null;

  const commandDone = typedChars >= COMMAND.length;

  return (
    <div
      role="presentation"
      onClick={skip}
      className="fixed inset-0 z-[10000] flex flex-col font-mono"
      style={{
        background: COLOR.background,
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${TIMING_STEPS.slide}ms cubic-bezier(0.16,1,0.3,1)`,
        willChange: "transform",
        pointerEvents: closing ? "none" : "auto",
        cursor: "pointer",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          background: COLOR.titleBar,
          borderBottom: `1px solid ${COLOR.border}`,
          opacity: closing ? 0 : 1,
          transition: `opacity ${TIMING_STEPS.textFade}ms ease`,
        }}
      >
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLOR.greenFaint }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLOR.greenFaint }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLOR.greenDim }} />
        </span>
        <span className="mx-auto text-[11px]" style={{ color: COLOR.greenDim }}>
          lucasmontalvao2019@icloud.com: ~
        </span>
        <span className="w-[42px]" />
      </div>

      <div
        className="flex-1 px-5 py-5 text-[13px] leading-[2] sm:px-8 sm:text-[14px]"
        style={{
          color: COLOR.green,
          opacity: closing ? 0 : 1,
          transition: `opacity ${TIMING_STEPS.textFade}ms ease`,
        }}
      >
        <p>
          <span style={{ color: COLOR.greenDim }}>$ </span>
          {COMMAND.slice(0, typedChars)}
          {!commandDone && <Cursor />}
        </p>
        {BOOT_LINES.slice(0, visibleLines).map((line) => (
          <p key={line.text} style={{ color: COLOR.greenDim }}>
            <span style={{ color: COLOR.greenFaint }}>&gt; </span>
            {line.text}
            {line.status && (
              <>
                <span style={{ color: COLOR.greenFaint }}> ......... </span>
                <span style={{ color: COLOR.green }}>{line.status}</span>
              </>
            )}
          </p>
        ))}
        {welcomeVisible && (
          <>
            <p style={{ marginTop: "0.5em" }}>{WELCOME}</p>
            <p>
              <span style={{ color: COLOR.greenDim }}>$ </span>
              <Cursor />
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes terminal-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="inline-block align-middle"
      style={{
        width: "8px",
        height: "16px",
        marginLeft: "2px",
        background: COLOR.green,
        animation: "terminal-blink 1s step-end infinite",
      }}
    />
  );
}
