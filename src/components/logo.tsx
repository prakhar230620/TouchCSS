import Image from 'next/image';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showText?: boolean;
    className?: string;
}

const sizes = {
    sm: { img: 32, text: 'text-lg' },
    md: { img: 48, text: 'text-2xl' },
    lg: { img: 64, text: 'text-3xl' },
    xl: { img: 96, text: 'text-5xl' },
};

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
    const { img, text } = sizes[size];

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <Image
                src="/logo.png"
                alt="KeyCodeX Logo"
                width={img}
                height={img}
                className="object-contain"
                priority
            />
            {showText && (
                <div className="flex flex-col">
                    <span className={`${text} font-extrabold text-primary tracking-tight`}>
                        KeyCodeX
                    </span>
                    <span className="text-xs text-muted-foreground -mt-1">
                        Unlock Your Coding Potential
                    </span>
                </div>
            )}
        </div>
    );
}
