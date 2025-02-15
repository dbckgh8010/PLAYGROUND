$(function() {
/*헤더 영역에 시계 부분*/
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

/*메인 페이지에 텍스트 출력 부분*/
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
/*section2 favorite swiper부분*/
    var mySwiper1 = new Swiper(".sc-about .swiper", {
        slidesPerView: 1,
        grabCursor: true,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            bulletActiveClass: 'on',
            clickable: true
        },
        autoplay: {
            delay: 3200,
            disableOnInteraction: false,
        },
        breakpoints: {
            1500: {slidesPerView: 3},
            769: {slidesPerView: 2}
        }
    });

/*section2 about부분 radar chart*/
    var chart = $("#radar")[0].getContext("2d");
    var data = {
        labels: ['', '부정적', '흡수력', '창의력', '도전정신', '꼼꼼함', '집중력', '긍정', '끈기'],
        datasets: [{
            label: '나의 그래프',
            data: [0, 2, 8, 6, 8, 9, 9, 10, 10],
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

/*section3 skill 부분 서클 채워지고 초기화되고 다시 채워지는*/
    function animateProgress() {
        $(".skill-circle").each(function () {
            let $progress = $(this);
            let degree = 0;
            let targetDegree = parseInt($progress.data("degree"));
            let color = $progress.data("color");
            let $number = $progress.find(".circle-percent");

            $progress.find(".outer-ring").css("background", `conic-gradient(#222 0%, #222 100%)`);
            $number.html("0<span>%</span>").css("color", color);
    
            setTimeout(() => {
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
                }, 30);
            }, 500);
        });
    }
    
    animateProgress();
    
    setInterval(animateProgress, 8000);

/*section4 project부분*/
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    let pinStart = 80;
    let gap = 30;

    const items = gsap.utils.toArray(".project-item");

    ScrollTrigger.matchMedia({
        // 769px 이상일 때
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
                        end: "bottom 760",
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