// ✅ Server Component — animation بـ CSS فقط، مفيش useState
interface TypewriterTitleProps {
  text: string;
  className?: string;
}

export const TypewriterTitle = ({ text, className = '' }: TypewriterTitleProps) => (
  <h1
    className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 
    overflow-hidden leading-relaxed max-w-full 
    min-h-[5rem] sm:min-h-[6rem] md:min-h-[8rem] ${className}`}
  >
    {text.split('').map((char, i) => (
      <span
        key={i}
        className="opacity-0 inline"
        style={{
          animation: 'typewriter-char 0.3s forwards',
          animationDelay: `${0.5 + i * 0.03}s`,
        }}
      >
        {char}
      </span>
    ))}
  </h1>
);