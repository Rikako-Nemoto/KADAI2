 (function(){
  
    let timer = document.getElementById('timer');
    let start = document.getElementById('start');
    let stop = document.getElementById('stop');
    let reset = document.getElementById('reset');

    //クリック時の時間を保持するための変数定義
    let startTime;

    //再スタートするための変数。 初めはだから0で初期化
    let elapsedTime = 0;

    //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
    let timeToadd = 0;


    //ミリ秒の表示ではなく、分とか秒に直すための関数, 他のところからも呼び出すので別関数として作る
    //計算方法として135200ミリ秒経過したとしてそれを分とか秒に直すと -> 02:15:200
    function updateTimetText(){
        
        //h(時) = 135200 / 3600000ミリ秒で割った数の商　-> 
        let h = Math.floor(elapsedTime / 3600000);
        
        //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 
        let m = Math.floor(elapsedTime / 60000);

        //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
        let s = Math.floor(elapsedTime % 60000 / 1000);
        
        let ms = Math.floor(elapsedTime%1000/100);

        //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
        //javascriptでは文字列数列を連結すると文字列になる
        //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
        h = ('0' + h)
        m = ('0' + m)
        s = ('0' + s)
        ms = ('0' + ms)

        //HTMLのid　timer部分に表示させる　
        timer.textContent = h + ':'+m + ':' + s + ':' + ms;
    }
    
     //再帰的に使える用の関数
    function countUp(){

        //timerId変数はsetTimeoutの返り値になるので代入する
        timerId = setTimeout(function(){

            //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText()

            //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
            countUp();

        //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
        },10);
    }
    
    //startボタンにクリック時のイベントを追加(タイマースタートイベント)
    start.addEventListener('click',function(){
        
   //在時刻を示すDate.nowを代入
        startTime = Date.now();
        document.getElementById("start").disabled = true; // スタートボタンの無効化
        document.getElementById("stop").disabled = false; // ストップボタンの有効化
        document.getElementById("reset").disabled = false; // リセットボタンの有効化
        
        //再帰的に使えるように関数を作る
        countUp();
	});

    //stopボタンにクリック時のイベントを追加(タイマーストップイベント)
    stop.addEventListener('click',function(){

        //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
       clearTimeout(timerId);
    　document.getElementById("stop").disabled =true; // ストップボタンの有効化
    　 document.getElementById("start").disabled = false; // スタートボタンの有効化
       
        //タイマーに表示される時間elapsedTimeが現在時刻かたスタートボタンを押した時刻を引いたものなので、
        //タイマーを再開させたら0になってしまう。elapsedTime = Date.now - startTime
        //それを回避するためには過去のスタート時間からストップ時間までの経過時間を足してあげなければならない。elapsedTime = Date.now - startTime + timeToadd (timeToadd = ストップを押した時刻(Date.now)から直近のスタート時刻(startTime)を引く)
       timeToadd += Date.now() - startTime;
    });
    
    //resetボタンにクリック時のイベントを追加(タイマーリセットイベント)
    reset.addEventListener('click',function(){

        //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
        elapsedTime = 0;

        //リセット時に0に初期化
        timeToadd = 0;
        document.getElementById("stop").disabled = true; // ストップボタンの無効化
        document.getElementById("reset").disabled = true; // リセットボタンの無効化
        
        //updateTimetTextで0になったタイムを表示
        updateTimetText();

    });
})();