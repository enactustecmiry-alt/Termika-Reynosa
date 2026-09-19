document.addEventListener("DOMContentLoaded",()=>{
  const toggle=document.querySelector(".menu"), mobile=document.querySelector(".mobile-nav");
  toggle?.addEventListener("click",()=>mobile.classList.toggle("open"));
  mobile?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobile.classList.remove("open")));

  const reveal=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");reveal.unobserve(e.target)}})
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(x=>reveal.observe(x));

  document.querySelectorAll("[data-counter]").forEach(el=>{
    const obs=new IntersectionObserver(entries=>{
      if(!entries[0].isIntersecting)return;
      const target=Number(el.dataset.counter), start=performance.now(), duration=1500;
      const tick=t=>{let p=Math.min((t-start)/duration,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(target*e).toLocaleString("en-US");if(p<1)requestAnimationFrame(tick)};
      requestAnimationFrame(tick);obs.disconnect();
    },{threshold:.6});obs.observe(el);
  });

  const area=document.querySelector("#area"), result=document.querySelector("#liters");
  function calc(){if(!area||!result)return;const a=Math.max(0,Number(area.value)||0);result.textContent=`${(a/8).toFixed(1)} — ${(a/6).toFixed(1)} L`}
  area?.addEventListener("input",calc);calc();

  const steps=document.querySelectorAll(".step"), stepDesc=document.querySelector("#step-desc");
  const copy=[
    "Preparar el recubrimiento hasta obtener una mezcla homogénea antes de llevarlo a la superficie.",
    "Distribuir el material de manera uniforme sobre la superficie previamente preparada.",
    "Construir una cobertura continua procurando evitar zonas sin recubrimiento.",
    "Revisar visualmente la continuidad de la cobertura antes de evaluar el resultado."
  ];
  steps.forEach((s,i)=>s.addEventListener("click",()=>{
    steps.forEach(x=>x.classList.remove("active"));s.classList.add("active");if(stepDesc)stepDesc.textContent=copy[i];
  }));

  const cursor=document.querySelector(".cursor");
  if(cursor&&matchMedia("(pointer:fine)").matches)window.addEventListener("pointermove",e=>{
    cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px";
  },{passive:true});

  // Small scroll-based movement for decorative objects
  const blobs=document.querySelectorAll(".blob,.moving-orb");
  window.addEventListener("scroll",()=>{
    const y=scrollY;
    blobs.forEach((b,i)=>b.style.translate=`0 ${(y*(i%2?.025:-.018)).toFixed(1)}px`);
  },{passive:true});
});