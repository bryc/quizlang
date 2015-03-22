function shuffle(a) {
    for (var b = a.length, d, c; 0 !== b;) c = Math.floor(Math.random() * b), b -= 1, d = a[b], a[b] = a[c], a[c] = d;
    return a;
}

function sleep(a, b) {
    quiz.wait = true;
    setTimeout(function () {
        b();
    }, a);
}

var quiz = {incorrect:{}, incorrect2:{}}, y;

var KEYS = Object.keys(data);

for(var i = 0; i < KEYS.length; i++)
{
    var CODE = KEYS[i];

    quiz.incorrect[CODE] = [];
    quiz.incorrect2[CODE] = [];
    document.querySelector("#lang optgroup").innerHTML += "<option value="+CODE+">"+CODE+"</option>";
}



quiz.initQuiz = function (z, c) { // array: greek  , name: greek

    this.mode = z,
    this.correctAnswer = null;

	this.shit = false;
    this.wait = false,
    this.score = [0, 0],
    this.question = document.querySelector('.question'),
    this.options = document.querySelectorAll('.option'),
    this.source = data[z];
    if (c === undefined) { //,true
        this.questionz = [];
        for (var i = 0; i < data[z].length; i++) {
            this.questionz.push(i);
        }
    } else {
		this.shit=true;
        this.questionz = this.incorrect[this.mode];
    }
    shuffle(this.questionz);
    this.total = this.questionz.length;
    for (var q = 0; q < 4; q++) {
        this.options[q].onclick = this.chooseAnswer;
    }
    this.createQuestion();
    document.getElementById('result').innerHTML = '<i>Test has initiated</i>';
};


quiz.createQuestion = function () {
	document.getElementById('ink').innerHTML = "Retry <b>"+(this.incorrect[this.mode].length)+" "+this.mode+"</b> incorrect question(s)";
    if (this.questionz.length > 0) {
        this.wait = false;
        // Initialize answer styles
        for (i = 0; i < 4; i++) {
            this.options[i].style.backgroundColor = '';
            this.options[i].style.display = '';
            this.options[i].style.color = '';
            this.options[i].style.opacity = '';
            this.options[i].style.fontWeight = '';
            this.options[i].className = 'option';
        }

        // Get current question from list
        var randWord = this.questionz[0];

        this.correctAnswer = randWord;
        // Remove current question (for the next question)
        //if (0 > -1) {
            this.questionz.splice(0, 1);
      //  }
        document.getElementById('info').innerHTML = "Question " + (this.total - this.questionz.length) + " of " + this.total ;
		console.log(this.total,this.questionz.length);
        // ----------------------
        // Initialize the answers array
        var answers = [randWord];

        // Gather 20 random answers
   
            var sours = this.source;


        for (var i = 0, a = []; i < 20; i++) {
            var num = Math.random() * sours.length | 0;
            if (num !== randWord) {
                a.push(num);
            }
        }
        // Strip duplicates
        var randWords = a.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
        // Get random answers
        answers.push(randWords[0]);
        answers.push(randWords[1]);
        answers.push(randWords[2]);
        // Shuffle entire list of answers
        shuffle(answers);
        console.log(quiz.correctAnswer, answers.indexOf(quiz.correctAnswer) + 1, answers);
        // Populate the quiz interface
        this.question.innerHTML = this.source[randWord][0];
        this.options[0].innerHTML = sours[answers[0]][1];
        this.options[1].innerHTML = sours[answers[1]][1];
        this.options[2].innerHTML = sours[answers[2]][1];
        this.options[3].innerHTML = sours[answers[3]][1];
        this.options[0].setAttribute('answer', answers[0]);
        this.options[1].setAttribute('answer', answers[1]);
        this.options[2].setAttribute('answer', answers[2]);
        this.options[3].setAttribute('answer', answers[3]);
    } else {
        this.question.innerHTML = "Done";
        for (q = 0; q < 4; q++) {
            this.options[q].style.backgroundColor = '';
            this.options[q].style.color = '';
            this.options[q].style.display = 'none';
            this.options[q].style.fontWeight = '';
            this.options[q].className = 'option';
            this.options[q].innerHTML = '';
        }

    }
};

quiz.chooseAnswer = function () {
    if (quiz.wait) {
        return 0;
    }

    if (this.getAttribute('answer') == quiz.correctAnswer) {
        this.style.backgroundColor = 'green';
        quiz.score[0]++;
        quiz.score[1]++;

        for (i = 0; i < 4; i++) {
            quiz.options[i].style.opacity = '0.15';
        }
        this.style.backgroundColor = '#ACC281';
        this.style.opacity = '1';
        sleep(100, function () {
            quiz.createQuestion();
        }); ///////////////100
    } else {

        for (i = 0; i < 4; i++) {
            quiz.options[i].style.opacity = '0.15';
        }
        this.style.backgroundColor = '#EE8F71';
        this.style.opacity = '1';
        quiz.score[1]++;
		
		if(!this.shit){
			
			quiz.incorrect[quiz.mode].push(quiz.correctAnswer);

		}
        document.querySelector("[answer='" + quiz.correctAnswer + "']").style.backgroundColor = '#ACC281';
        document.querySelector("[answer='" + quiz.correctAnswer + "']").style.color = '#fff';
        document.querySelector("[answer='" + quiz.correctAnswer + "']").style.opacity = '1';
        document.querySelector("[answer='" + quiz.correctAnswer + "']").className = 'option test';
        sleep(4000, function () {
            quiz.createQuestion();
        });
    }
    this.style.color = '#fff';
    this.style.fontWeight = 'bold';
    document.getElementById('result').innerHTML = "Grade: " +Math.round((quiz.score[0] / quiz.score[1] * 100) * 100) / 100 + '% (' + quiz.score[0] + " of " + quiz.score[1] + " correct)";
};

function changeMode(a, c) {
    var id = window.setTimeout(function () {}, 0);
    while (id--) {
        window.clearTimeout(id);
    } // Clear Timeouts
    document.getElementById('result').innerHTML = '';
    quiz.initQuiz(a, c);
};

function show()
{ 
    console.log(y);
    if(y===undefined){
        y=123;
        console.log(y);
        var yu = "<td colspan=2 class=top>";
        yu += "<h3>"+quiz.mode+"</h3><br>";
        for(i=0;i<quiz.incorrect[quiz.mode].length;i++) 
        {
            yu += "<b>"+ quiz.source[quiz.incorrect[quiz.mode][i]][0] + "</b> - " + quiz.source[quiz.incorrect[quiz.mode][i]][1] + "<br>";
        }
        yu += "</td>";
        document.getElementById('chk').innerHTML='Hide List';
        document.getElementById('z').innerHTML=yu;
	} else {
        document.getElementById('z').innerHTML='';
        document.getElementById('chk').innerHTML='Show List';
        y=undefined;
	}
};


window.onload = function () {
    changeMode('greek');
};


document.getElementById('lang').onchange = function() 
{
    changeMode(this.value);
};

document.getElementById('ink').onclick = function()
{
	changeMode(quiz.mode,true);
};

document.getElementById('rest').onclick = function()
{
	changeMode(quiz.mode);
};

document.getElementById('chk').onclick = function()
{
    show();
};
