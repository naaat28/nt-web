"use strict";

/*------------ ローディングアニメーション ------------*/
// 要素を取ってくる
const loading = document.querySelector('.loading');
const flowerImage = document.getElementById('flower-image');
const btnWrapper = document.querySelector('.load_btn-wrapper');
const btn = document.querySelector('.load_btn');

const contentScreen = document.querySelector('.m_overlay');

// 初期化する変数を定義
let logoVivus;

function VivusInit() {
  // アニメーション中はスクロールしないようにする
  document.body.classList.add('no-scroll');
  contentScreen.classList.add('is-show');

  // Vivusを初期化する
  logoVivus = new Vivus(flowerImage, {
    start: 'autostart',
    duration: 200,
    type: 'scenario',
    pathTimingFunction: Vivus.EASE,
  },
  function() { // アニメーションが終わったらする処理
    // fill-opacityを付けて色を表示させる
    flowerImage.classList.add('done');
    // ボタンを表示する
    btnWrapper.classList.add('is-loaded');
  });
}

// ボタン
window.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector(".load_btn");
  if (btn) {
    btn.classList.remove("is-active");
    btn.addEventListener('click', function (e) {
      e.preventDefault() //デフォルトの動作を無効化
      e.target.classList.add("is-active");//ボタン表示
      loading.classList.add("is-loaded");//ローディング画面非表示
          document.body.classList.remove('no-scroll');//クリックしたらスクロール解除
      // contentScreen.classList.remove('is-show');

      setTimeout(function() {
        contentScreen.classList.remove('is-show'); //0.5秒後にページ遷移
      animateText();
      topAnimation();
      }, 500);

    });
  }
});



/*------------ top_copy ------------*/
function animateText() {

  const textElement = document.querySelector('.top_kv_txts-copy');
  const text = textElement.textContent;
  const characters = text.split('');
  textElement.innerHTML = '';

  characters.forEach((char, index) => {
    const span = document.createElement('span');
    span.innerText = char;

    // '彩' の文字にだけクラスを追加する
    if (char === '彩') {
      span.classList.add('u_txts-copy__color');
    }

    span.style.opacity = 0;
    textElement.appendChild(span);

    gsap.to(span, {
      duration: 3,
      opacity: 1,
      y: 0,
      delay: index * 0.05,
      ease: 'power1.out',
      onComplete: function() {
        setTimeout(topKvTxtsCopySub, 1);
      },
    });
  });
}

function topKvTxtsCopySub() {
  const decsElement = document.querySelector('.top_kv_txts-copy__sub');
  decsElement.classList.add('is-active');
}



// nav.scroll
function topAnimation(){
  const headerNavList = document.querySelector('.l_header-nav_list');
  const scrollDown = document.querySelector('.u_scroll-down');
  const tl = gsap.timeline();

  tl
  .from(headerNavList, {autoAlpha:0,duration:0.5,x:-50,delay:3.7})
  .from(scrollDown,{autoAlpha:0,duration:0.5})

}


// ２回目以降のアクセス時はローディングアニメーションしない
const opening = document.querySelector('.js_opening');
function webStorage() {
  if (sessionStorage.getItem('access')) {
    contentScreen.classList.remove('is-show'); 
    opening.classList.add("is-loaded");
    animateText(); 
  } else {
    sessionStorage.setItem('access', 0);
    VivusInit();
    // animateText(); 

  }
}
webStorage();



/*------------ ハンバーガーメニュー ------------*/
const ham = document.querySelector(".js_hamburger");
const nav = document.querySelector(".js_nav");
const barElements = document.querySelectorAll(".m_hamburger-bar");
const body = document.querySelector(".js_body");

ham.addEventListener("click", ()=>{
  ham.classList.toggle("is-active");
  nav.classList.toggle("is-active");
  body.classList.toggle("is-active");
  document.body.classList.toggle('no-scroll');

  barElements.forEach((bar) => {
    bar.classList.toggle("change-color"); //オープン時のバーの色を変更
});
})



const jsNavLinks = document.querySelectorAll(".js_nav_link");
jsNavLinks.forEach(link => {
  link.addEventListener("click", () => {
    // ハンバーガーメニューを非表示にするための処理
    ham.classList.remove("is-active");
    nav.classList.remove("is-active");
    body.classList.remove("is-active");
    document.body.classList.remove('no-scroll');

    barElements.forEach((bar) => {
      bar.classList.remove("change-color");
    });
  });
});






/*------------ PC nav ------------*/
const navItems = document.querySelectorAll(".js-pcNav");
// console.log(navItems);

// 各ナビゲーションアイテムに対して処理を実行
navItems.forEach((navItem) => {
  //navItem要素のdata-nav-target属性の値を取得
  const sectionId = navItem.getAttribute("data-nav-target");
  // console.log(sectionId);

  // 対応するセクションを取得
  const section = document.getElementById(sectionId);
  // console.log(section);

  // ScrollTriggerを作成
  ScrollTrigger.create({
    trigger: section, // トリガーとなる要素を指定
    start: "top .m_scroll", // トリガーとなる位置を調整
    // end: "top bottom",
    // markers: true, 

    onEnter: () => {
      // アクティブなナビゲーションアイテム以外
      navItems.forEach((item) => item.classList.remove("is-active"));
      // 現在のナビゲーションアイテム
      navItem.classList.add("is-active");
    },

    onLeaveBack: () => {
      // アクティブなナビゲーションアイテム以外
      navItems.forEach((item) => item.classList.remove("is-active"));
      // 現在のナビゲーションアイテム
      navItem.classList.add("is-active");
    },
  });
});


// ナビゲーションリンク要素を取得し、navLinks配列に格納する
const navLinks = document.querySelectorAll(".l_header-nav_link");

// 各ナビゲーションリンク要素に対してクリックイベントを追加
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    // クリックイベント発生後、600ミリ秒(0.6秒)後に以下のコードを実行する（遅延処理）
    setTimeout(() => {
      // navItemsに対してアクティブなクラスを除去する
      navItems.forEach((item) => item.classList.remove("is-active"));
      // クリックされたリンクの親要素に "is-active" クラスを追加する
      // これにより、クリックされたリンクがアクティブなスタイルを持つようになる
      e.target.parentNode.classList.add("is-active");
    }, 600); // 600ミリ秒の遅延を設定
  });
});


/* ----------- ページ内スクロール ----------- */

window.addEventListener('DOMContentLoaded', () => {
  // ページ内リンク（href属性が "#" で始まる<a>要素）を取得
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  // anchorLinksを配列に変換
  const anchorLinksArray = Array.prototype.slice.call(anchorLinks);

  // 各ページ内リンクに対して処理を実行
  anchorLinksArray.forEach(link => {
    // デバッグ用にリンクの内容をコンソールに表示
    console.log(link);

    // リンクがクリックされたときのイベントリスナーを追加
    link.addEventListener('click', e => {
      // リンクのデフォルトのクリック動作をキャンセル（ページ遷移を防止）
      e.preventDefault();

      // クリックされたリンクのhref属性（ターゲットID）を取得
      const targetId = link.hash;
      // ターゲットIDに対応する要素を取得
      const targetElement = document.querySelector(targetId);
      
      // ターゲット要素の位置までのオフセットを計算（スクロール位置調整用）
      const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;

      // スムーズなスクロールを実行
      window.scrollTo({
        top: targetOffsetTop,
        behavior: "smooth"
      });
    });
  });
});



/*------------ works modal ------------*/
const worksModal = document.querySelectorAll('.js-works_modal'); 
const worksModalOpen = document.querySelectorAll('.js-works_modalOpen');
const worksModalClose = document.querySelector('.js-works_modalClose');

// モーダルを開く
worksModalOpen.forEach(button => {
  button.addEventListener('click', () => {
    // クリックされたボタンのdata-modal-target属性から対応するモーダルのIDを取得
    const modalId = button.getAttribute('data-modal-target');
    const modal = document.getElementById(modalId);

    // 他のモーダルを閉じる
    worksModal.forEach(m => {
      if (m !== modal) {
        m.classList.remove('is-show'); //他のモーダルからis-showクラスを削除
      }
    });

    // クリックされたボタンに対応するモーダルを開く（is-showクラスを追加）
    modal.classList.add('is-show');
    document.body.classList.add('no-scroll'); // モーダル表示時はスクロールしない
  });
});

// モーダルを閉じるボタン
worksModalClose.addEventListener('click', () => {
  // 開いているモーダルを取得
  const openModal = document.querySelector('.js-works_modal.is-show');
  if (openModal) {
    // モーダルを閉じる
    openModal.classList.remove('is-show');
    document.body.classList.remove('no-scroll'); // 背景スクロール解除
  }
});

// モーダルの外側（背景部分）をクリックしたときにもモーダルを閉じる
worksModal.forEach(modal => {
  modal.addEventListener('click', event => {
    // クリックされた要素がモーダル内の要素でない場合、モーダルを閉じる
    if (!event.target.closest('.works_modal_inner')) {
      // モーダルを閉じる
      modal.classList.remove('is-show');
      document.body.classList.remove('no-scroll'); // 背景スクロール解除
    }
  });
});



/*------------ privacy modal ------------*/
const privacyModal = document.querySelector('.js-privacy_modal'); 
const privacyModalOpen = document.querySelector('.js-privacy_modalOpen'); // モーダルを開く
const privacyModalClose = document.querySelector('.js-privacy_modalClose'); // モーダルを閉じる

// モーダルを開く
privacyModalOpen.addEventListener('click', (event) => {
  event.preventDefault(); // デフォルトのクリックイベントを無効にする
  privacyModal.classList.add('is-open'); // モーダルを表示するためのクラスを追加
  document.body.classList.add('no-scroll'); // モーダル表示時はスクロールしない
});

// モーダルを閉じる
privacyModalClose.addEventListener('click', () => {
  privacyModal.classList.remove('is-open'); // モーダルを非表示にするためのクラスを削除
  document.body.classList.remove('no-scroll'); // 背景スクロールの無効化を解除
});

// モーダルの外側（背景部分）をクリックしたときにもモーダルを閉じるようにする
privacyModal.addEventListener('click', (event) => {
  // クリックされた要素がモーダル内の要素でない場合、モーダルを閉じる
  if (!event.target.closest('.privacy_modal_inner')) {
    privacyModal.classList.remove('is-open'); // モーダルを非表示にするためのクラスを削除
    document.body.classList.remove('no-scroll'); // 背景スクロール解除
  }
});



/*------------ 横スクロール　------------*/
const skillsArea = document.querySelector(".js-skills_area");
const skillsList = document.querySelector(".js-skills_list");
const skillsItems = document.querySelectorAll(".js-skills_item");
const skillsNum = skillsItems.length;

const worksArea = document.querySelector(".js-works_area");
const worksList = document.querySelector(".js-works_list");
const worksItems = document.querySelectorAll(".js-works_item");
const worksNum = worksItems.length;

let width = window.innerWidth;

function horizontalScroll() {
  width = window.innerWidth;
  console.log(width);

  if (width <= 600) {
    // 横幅を指定
    gsap.set(skillsList, { width: skillsNum * 90 + "%" });
    gsap.set(skillsItems, { width: 100 / skillsNum + "%" });

    gsap.to(skillsItems, {
      xPercent: -120 * (skillsNum - 1), // x方向に移動させる
      ease: "none",
      scrollTrigger: {
        trigger: skillsArea , // トリガー
        start: "80px top", // 開始位置
        end: "+=410", // 終了位置
        pin: true, // ピン留め
        scrub: true, // スクロール量に応じて動かす
        // markers: true,
      },
    });
  }

  if (width <= 600) {
    // 横幅を指定
    gsap.set(worksList, { width: worksNum * 100 + "%" });
    gsap.set(worksItems, { width: 100 / worksNum + "%" });

    gsap.to(worksItems, {
      xPercent: -120 * (worksNum - 1), // x方向に移動させる
      ease: "none",
      scrollTrigger: {
        trigger: worksArea, // トリガー
        start: "80px top", // 開始位置
        end: "+=410", // 終了位置
        pin: true, // ピン留め
        scrub: true, // スクロール量に応じて動かす
        // markers: true,
      },
    });
  }
}

horizontalScroll();

//リサイズ時再度呼び出す
window.addEventListener("resize", () => {
  horizontalScroll();
});



/*------------ PC skills ------------*/
const skillsItemsPc = document.querySelectorAll('.js-skills_item');

  function animateItems() {
    skillsItemsPc.forEach((item, index) => {
      gsap.from(item, {
        duration: 0.6,
        // x: 0,
        // y: 30,
        // opacity: 0,
        delay: index * 0.2,
        ease: 'power3.out',
        onComplete: function () {
          item.style.opacity = 1;
          item.style.transform = 'translateY(0)';
        },
      });
    });
  }


// スクロールトリガーでアニメーションを実行
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
  trigger: '.js-skills_list',
  start: 'top 90%', // トリガー位置を調整
  end: 'bottom 20%', // トリガー位置を調整
  onEnter: animateItems, // トリガーに入ったときにanimateItems()関数を実行
  once: true, // 1回だけアニメーションを実行
  // markers: true 
});



/*------------ PC スクロールトリガー ------------*/
const scrollAreas = document.querySelectorAll('.js-scroll-trigger');
// console.log(scrollAreas);

// 取得した要素をforEach()を使って1個ずつ処理する
scrollAreas.forEach((scrollArea) => {
  // デバイスの幅が1080px以上の場合のみアニメーションを設定する
  if (window.innerWidth >= 768) {
    gsap.fromTo(
      scrollArea,
      {
        // 初期状態
        opacity: 0,
        y: 80,
      },
      {
        // アニメーション終了時の状態
        opacity: 1,
        y: 0,
        duration: 2, // 2秒かけて表示
        scrollTrigger: {
          trigger: scrollArea,
          start: "top 70%",
          end: "bottom 20%",
          // markers: true, 
          onEnter: () => {
            // console.log("Element entered!");
          },
        },
      }
    );
  }
});

/*------------ contact btn------------*/
const isAgreed = document.querySelector('.contact_privacy-checkbox_item');
const contactBtn = document.querySelector('.contact_btn');

isAgreed.addEventListener('change', () => {
  // console.log(isAgreed.checked);
  if(isAgreed.checked === true){
    contactBtn.disabled = false;
  }else{
    contactBtn.disabled =true;
  }
});

