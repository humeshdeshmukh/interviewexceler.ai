import Image from "next/image";

export const RightHero = () => {
    return (
        <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[500px]">
            {/* Custom background gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#fcba28]/20 via-[#fffbe6]/40 to-[#fcba28]/10 blur-2xl" />
            {/* Student Practicing Image */}
            <div className="relative z-10 flex justify-center items-center w-full h-full py-8">
                <div className="w-full flex justify-center items-center">
                    <div
                        className="relative"
                        style={{
                            width: '480px',
                            height: '480px',
                            maxWidth: '100%',
                            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                        }}
                    >
                        <Image
                            src="/ChatGPT Image Jul 14, 2025, 07_00_22 PM.png"
                            alt="Student practicing interview"
                            fill
                            style={{ objectFit: 'cover', borderRadius: '2rem' }}
                            className="shadow-2xl"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};