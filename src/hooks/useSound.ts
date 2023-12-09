// working idea

// useEffect(() => {
//   sound.current = new Howl({
//     src: ["/assets/audio/piano.mp3"],
//     html5: true,
//     onplay: () => {
//       if (sound.current) {
//         const sequenceDurationMs = sound.current.duration() * 1000;
//         const startTime = Date.now();
//         const sequence = async () => {
//           while (Date.now() - startTime < sequenceDurationMs) {
//             await controls.start(wiggle);
//             await controls.start(resize);
//           }
//         };
//         sequence();
//       }
//     },
//     onstop: () => {
//       controls.stop();
//     },
//   });

//   return () => {
//     sound.current?.stop();
//   };
// }, [controls]);
// useEffect(() => {
//   controls.start(bounce);
//   controls.start(resize);
//   controls.start(wiggle);
//   controls.start(resize);
// }, [controls]);
