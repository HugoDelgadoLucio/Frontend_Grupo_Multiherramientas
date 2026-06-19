import styles from "./FloatingBlobs.module.css";

const blobs = [
    { className: styles.blob1, color: "#e63030", size: 550, top: -180, left: -120, opacity: 0.16, duration: 22, delay: 0 },
    { className: styles.blob2, color: "#1a2e4a", size: 400, top: -100, right: "5%", opacity: 0.7, duration: 18, delay: 2 },
    { className: styles.blob3, color: "#254a7e", size: 480, bottom: -200, right: -150, opacity: 0.5, duration: 26, delay: 1 },
    { className: styles.blob4, color: "#1a2e4a", size: 380, bottom: -150, left: "35%", opacity: 0.55, duration: 20, delay: 3 },
];

function FloatingBlobs() {
    return (
        <>
            {blobs.map((b, i) => (
                <div
                    key={i}
                    className={styles.blob}
                    style={{
                        width: `${b.size}px`,
                        height: `${b.size}px`,
                        background: b.color,
                        opacity: b.opacity,
                        top: b.top !== undefined ? `${b.top}px` : undefined,
                        bottom: b.bottom !== undefined ? `${b.bottom}px` : undefined,
                        left: b.left !== undefined ? b.left : undefined,
                        right: b.right !== undefined ? b.right : undefined,
                        animationDuration: `${b.duration}s`,
                        animationDelay: `${b.delay}s`,
                    }}
                />
            ))}
        </>
    );
}

export default FloatingBlobs;