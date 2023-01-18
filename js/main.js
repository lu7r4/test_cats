let app = new Vue({
    el: '.main',
    data: {
        showMain: true,
     //   showSocial: false,
        showAchivments: false,
        showQuestions: false,
        showResult: false,
        number: 0,
        score: {
        'abisin': 0,
        'british': 0,
        'siamka': 0,
        'american': 0,
        'maincun': 0,
        },
        totalGame: localStorage.getItem('sc2TotalGame') ? JSON.parse(localStorage.getItem('sc2TotalGame')) : {
        'abisin': 0,
        'british': 0,
        'siamka': 0,
        'american': 0,
        'maincun': 0,
        'oriental': 0,
        'yard': 0,
        },
        totalGames: localStorage.getItem('sc2TotalGames') ? localStorage.getItem('sc2TotalGames') : 0,
        questions: questions,
        results: results,
        resultRace: 'oriental',
    },
    methods: {
        goToMain() {
        this.showMain = true
       // this.showSocial = false
        this.showAchivments = false
        this.showQuestions = false
        this.showResult = false
        },
     /*   goToSocial() {
        this.showMain = false
        this.showSocial = true
        this.showAchivments = false
        this.showQuestions = false
        this.showResult = false
        }, */
        goToAchivments() {
        if(this.totalGames > 0) {
            this.showMain = false
          //  this.showSocial = false
            this.showAchivments = true
            this.showQuestions = false
            this.showResult = false
        } else {
            this.goToQuestions()
        }
        },
        goToQuestions() {
        this.score = {
            'abisin': 0,
            'british': 0,
            'siamka': 0,
            'american': 0,
            'maincun': 0,
        }
        this.showMain = false
     //   this.showSocial = false
        this.showAchivments = false
        this.showQuestions = true
        this.showResult = false
        },
        goToResult(race) {
        this.showMain = false
       // this.showSocial = false
        this.showAchivments = false
        this.showQuestions = false
        this.showResult = true
        this.resultRace = race
        },
        nextQuestions(answer) {
        if(this.number == 6) {
            this.number = 0
            this.endGame();
        } else {
            this.number++
        }
        eval(answer)
        },
        endGame() {
        this.totalGames++;
        localStorage.setItem('sc2TotalGames', this.totalGames)
        // Абисинская кошка
        if(this.score.abisin >= 2) {
            this.goToResult('abisin')
            this.totalGame.abisin++
        }
        // Британская кошка
        else if (this.score.british >= 2) { 
            this.goToResult('british')
            this.totalGame.british++
        }
        // Сиамская кошка
        else if (this.score.siamka >= 2) { 
            this.goToResult('siamka')
            this.totalGame.siamka++
        } 
        // Американская короткошерстная кошка
        else if (this.score.siamka > this.score.abisin && 
        this.score.siamka > this.score.maincun && 
        this.score.american == 5) { 
            this.goToResult('american')
            this.totalGame.american++
        }
        // Мейн-кун
        else if (this.score.maincun >= 2) { 
            this.goToResult('maincun')
            this.totalGame.maincun++
        }
        // Метис
        else if (Math.abs(this.score.siamka - this.score.abisin) <= 3) { 
            this.goToResult('yard')
            this.totalGame.yard++
        } 
        // Ориентальская кошка
        else { 
            this.goToResult('oriental')
            this.totalGame.oriental++
        }
        localStorage.setItem('sc2TotalGame', JSON.stringify(this.totalGame))
        }
    },
    computed: {
        totalScore() {
        let score=0
        for(let i in this.totalGame) {
            score+=(this.totalGame[i]*results[i].points)
        }
        return score
        },
        openRaces() {
        let count=0
        for(let i in this.totalGame) {
            if(this.totalGame[i]>0) count++
        }
        return count
        },
        favoriteRace() {
        let max='abisin'
        for(let i in this.totalGame) {
            if(this.totalGame[i]>this.totalGame[max]) {
            max=i
            }
        }
        return results[max].name
        },
        showResultRace() {
        return {
            'abisin': this.totalGame.abisin > 0 ? true : false,
            'british': this.totalGame.british > 0 ? true : false,
            'siamka': this.totalGame.siamka > 0 ? true : false,
            'american': this.totalGame.american > 0 ? true : false,
            'maincun': this.totalGame.maincun > 0 ? true : false,
            'oriental': this.totalGame.oriental > 0 ? true : false,
            'yard': this.totalGame.yard > 0 ? true : false,
        }
        }
    }
    })
// очистка результатов
    let remove = document.querySelector('.btn_remove');

    remove.addEventListener('click', ()=> {

        localStorage.clear();
        location.reload();

    })

    
