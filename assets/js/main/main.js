$(function() {
    setInterval(function() {
        var dateInfo = new Date();
        var hour = String(dateInfo.getHours()).padStart(2, '0');  // 2자리로 맞추기
        var min = String(dateInfo.getMinutes()).padStart(2, '0'); // 2자리로 맞추기
        var sec = String(dateInfo.getSeconds()).padStart(2, '0'); // 2자리로 맞추기
        var year = dateInfo.getFullYear();
        var month = dateInfo.getMonth() + 1;
        var date = dateInfo.getDate();
        var daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        var dayOfweek = daysOfWeek[dateInfo.getDay()];

        $(".day").html(year + "년&nbsp;" + month + "월&nbsp;" + date + "일&nbsp;" + dayOfweek + "요일");
        $(".time").html(hour + ":" + min + ":" + sec);
    }, 1000);

    const content = "Hellow, this is CHANGHO PLAYGROUND.";
    let i = 0;

    function typing() {
        if(i < content.length) {
            let text = content.charAt(i);
            $(".text").append(text);
            i++;
            setTimeout(typing, 100);
        } else{
            setTimeout(() => {
                i = 0;
                $(".text").empty();
                typing();
            }, 5000);
        };
    };
    
    typing();

    const text1 = "윤창호";
    const text2 = "1996.05.24";
    const text3 = "대한민국";
    const text4 = "성동구";

    let i1 = 0, i2 = 0, i3 = 0, i4 = 0;
    const delay = 300;
    const restartDelay = 4000;

    function startTyping() {
        const interval = setInterval(() => {
            if (i1 <text1.length) {
                $(".list-text1").append(text1.charAt(i1));
                i1++;
            }
            if (i2 <text2.length) {
                $(".list-text2").append(text2.charAt(i2));
                i2++;
            }
            if (i3 <text3.length) {
                $(".list-text3").append(text3.charAt(i3));
                i3++;
            }
            if (i4 <text4.length) {
                $(".list-text4").append(text4.charAt(i4));
                i4++;
            }
            if (i1 >= text1.length && i2 >= text2.length && i3 >= text3.length && i4 >= text4.length) {
                clearInterval(interval);
                setTimeout(() => {
                    i1 = 0, i2 = 0, i3 = 0, i4 = 0;
                    $(".list-text1").empty();
                    $(".list-text2").empty();
                    $(".list-text3").empty();
                    $(".list-text4").empty();

                    startTyping();
                }, restartDelay);
            }
        }, delay);
    }

    startTyping();

    var mySwiper1 = new Swiper(".sc-about .swiper", {
        slidesPerView: 1,
        grabCursor: true,
        loop: true,
        breakpoints: {
            1500: {slidesPerView: 3},
            769: {slidesPerView: 2}
        }
    });

    var chart = $("#radar")[0].getContext("2d");
    var data = {
        labels: ['부정적', '흡수력', '창의력', '도전정신', '꼼꼼함', '집중력', '긍정', '끈기'],
        datasets: [{
            label: '나의 그래프',
            data: [0, 8, 5, 8, 9, 9, 10, 10],
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#3f93d3;',
            pointHoverBackgroundColor: '#3f93d3;',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
        }]
    };

    var options = {
        title: {display: false, fontColor: '#3f93d3;', fontStyle: 'normal', fullWidth: false, text: 'CHART TITLE'},
        legend: {display: false},
        scale: {
            angleLines: {color: '#3f93d3;'}, gridLines: {color: '#3f93d3;'}, pointLabels: {fontColor: '#3f93d3;'},
            ticks: {display: true, min: 0, max: 10, stepSize: 2, color: '#ffffff'}
        },
        tooltips: {enabled: false},
    };

    var chart = new Chart(chart, {
        type: 'radar',
        data: data,
        options: options
    });

    $(".skill-circle").each(function () {
        let $progress = $(this);
        let degree = 0;
        let targetDegree = parseInt($progress.data("degree"));
    
        let color = $progress.data("color");
        let $number = $progress.find(".circle-percent");
    
        let interval = setInterval(function () {
            degree += 1;
    
            if (degree > targetDegree) {
            clearInterval(interval);
            return;
            }
    
            $progress.find(".outer-ring").css(
                "background",
                `conic-gradient(${color} ${degree}%, #222 0%)`
            );
            $number.html(degree + `<span>%</span>`).css("color", color);
        }, 50);
    });

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    let pinStart = 80;
    let gap = 30;

    const items = gsap.utils.toArray(".project-item");

    ScrollTrigger.matchMedia({
        // 768px 이상일 때
        "(min-width: 769px)": function() {
            items.forEach((item, index) => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 5%+=" + item.getAttribute("animation-item"),
                        endTrigger: ".project-wrap",
                        end: "bottom 800",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                    }
                });
                tl.to(item, {
                    y: -50,
                    scale: 0.85 + 0.02 * index,
                    transformOrigin: "center center"
                });
            });
        },
    
        // 768px 이하일 때
        "(max-width: 768px)": function() {
            items.forEach((item, index) => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 20%",
                        endTrigger: ".project-wrap",
                        end: "bottom 700",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                    }
                });
                tl.to(item, {
                    y: -100,
                    scale: 0.9 + 0.01 * index,
                    transformOrigin: "center center"
                });
            });
        }
    });
});