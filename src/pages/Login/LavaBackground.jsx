import { useEffect, useRef } from "react";
import styles from "./LavaBackground.module.css";

function LavaBackground() {
    const wrapRef = useRef(null);

    const blobs = [
    { color: "#1a2e4a", size: 520, left: 5,  dur: 16, delay: 0  },
    { color: "#e63030", size: 420, left: 20, dur: 13, delay: 2  },
    { color: "#1a2e4a", size: 600, left: 45, dur: 18, delay: 1  },
    { color: "#e63030", size: 380, left: 65, dur: 11, delay: 4  },
    { color: "#1a2e4a", size: 480, left: 35, dur: 15, delay: 6  },
    { color: "#e63030", size: 550, left: 78, dur: 14, delay: 3  },
    { color: "#1a2e4a", size: 400, left: 12, dur: 12, delay: 8  },
    { color: "#e63030", size: 460, left: 58, dur: 17, delay: 5  },
    { color: "#1a2e4a", size: 350, left: 82, dur: 13, delay: 7  },
    { color: "#e63030", size: 320, left: 48, dur: 10, delay: 10 },
    { color: "#1a2e4a", size: 580, left: 28, dur: 19, delay: 1  },
    { color: "#e63030", size: 440, left: 3,  dur: 12, delay: 12 },
];

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        const elements = [];

        blobs.forEach((c) => {
            const d = document.createElement("div");
            d.className = styles.blob;
            d.style.cssText = `
                width: ${c.size}px;
                height: ${c.size}px;
                background: ${c.color};
                left: ${c.left}%;
                bottom: -${c.size}px;
                animation-duration: ${c.dur}s;
                animation-delay: ${c.delay}s;
                opacity: 0;
            `;
            wrap.appendChild(d);
            elements.push(d);

            const restart = () => {
                d.style.animationDelay = "0s";
                d.style.animationName = "none";
                void d.offsetWidth;
                d.style.animationName = "";
            };
            d.addEventListener("animationend", restart);
        });

        return () => {
            elements.forEach((d) => d.remove());
        };
    }, []);

    return <div ref={wrapRef} className={styles.lava} />;
}

export default LavaBackground;