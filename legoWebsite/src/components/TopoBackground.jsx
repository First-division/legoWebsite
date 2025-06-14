import { useRef, useEffect } from "react";

function isMobileDevice() {
  return (
    typeof window !== "undefined" &&
    (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 700)
  );
}

const WireframeBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 }); // start off-screen
  const mobile = useRef(isMobileDevice());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const spacing = 20; // more lines
    const baseThickness = 0.5;
    const maxThickness = 2;

    const lines = [];

    for (let x = 0; x <= width; x += spacing) {
      lines.push({ x1: x, y1: 0, x2: x, y2: height, width: baseThickness });
    }

    for (let y = 0; y <= height; y += spacing) {
      lines.push({ x1: 0, y1: y, x2: width, y2: y, width: baseThickness });
    }

    let lastRandomMove = 0;

    const draw = (now) => {
      ctx.clearRect(0, 0, width, height);

      // On mobile, move the "mouse" randomly every ~2s
      if (mobile.current) {
        if (!lastRandomMove || now - lastRandomMove > 2000) {
          mouse.current.x = Math.random() * width;
          mouse.current.y = Math.random() * height;
          lastRandomMove = now;
        }
      }

      // find closest line to mouse
      let closestLine = null;
      let minDist = Infinity;

      for (const line of lines) {
        const dx = (line.x1 + line.x2) / 2 - mouse.current.x;
        const dy = (line.y1 + line.y2) / 2 - mouse.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < minDist) {
          minDist = dist;
          closestLine = line;
        }
      }

      for (const line of lines) {
        // SLOWER interpolation for mobile
        const lerpSpeed = mobile.current ? 0.05 : 0.15;
        const target =
          line === closestLine && minDist < 150 ? maxThickness : baseThickness;
        line.width += (target - line.width) * lerpSpeed;

        ctx.strokeStyle = "#444";
        ctx.lineWidth = line.width;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      }

      requestAnimationFrame((nextNow) => draw(nextNow));
    };

    const handleMove = (e) => {
      if (mobile.current) return; // Ignore real mouse events on mobile
      // Ignore if mouse is over nav or .liquid-box
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (
        el?.closest('.nav') ||
        el?.closest('.liquid-box')
      ) {
        mouse.current.x = -9999;
        mouse.current.y = -9999;
        return;
      }
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    if (!mobile.current) {
      window.addEventListener("mousemove", handleMove);
    }
    requestAnimationFrame((now) => draw(now));

    return () => {
      if (!mobile.current) {
        window.removeEventListener("mousemove", handleMove);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        background: "#111",
        pointerEvents: "none",
      }}
    />
  );
};

export default WireframeBackground;
