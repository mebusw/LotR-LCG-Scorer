describe("app", function () {
	var remoteService;
	var view;
	var presenter;
	
	beforeEach(function() {

		
	});
	
	it("should calc score right", function() {
        expect(MyApp.scorerController.get('players').length).toEqual(2);
		expect(1==1).toBeTruthy();
		
        expect(MyApp.finalScore).toEqual(80);
        
        MyApp.scorerController.set('rounds', 2);
        expect(MyApp.scorerController.get('rounds')).toEqual(2);
        expect(MyApp.scorerController.get('finalScore')).toEqual(90);
	});

	it("get from a set", function() {
        
	});
    
});
/*
describe("presenter", function () {
	var remoteService;
	var view;
	var presenter;
	
	beforeEach(function() {
		remoteService = tdd.buildRemoteService();
        view = tdd.buildView();
        presenter = tdd.buildPresenter(view, remoteService);	
		
	});
	
	it("should return a qustion from ajax service and show loading ", function() {
        spyOn(view, "setLoadingSectionVisibility");
		spyOn(remoteService, "fetchQuestion");
		spyOn(view, "bindChangeEventToUserAnswer");
		spyOn(view, "bindClickEventToNextQuestion");
		
		presenter.showARandomQuestion();
		
		expect(view.setLoadingSectionVisibility).toHaveBeenCalledWith(true);
        expect(remoteService.fetchQuestion).toHaveBeenCalledWith(presenter.renderQuestion);
		
	});

	it("should binding events ", function() {
		spyOn(view, "bindChangeEventToUserAnswer");
		spyOn(view, "bindClickEventToNextQuestion");
		spyOn(view, "binClickEventToIGiveup");
		
		presenter.bindEvnets();
		
		expect(view.bindChangeEventToUserAnswer).toHaveBeenCalled();
		expect(view.bindClickEventToNextQuestion).toHaveBeenCalled();
		expect(view.binClickEventToIGiveup).toHaveBeenCalled();
		
	});
		
	it("should hide loading and show question", function() {
        spyOn(view, "showQuestion");
		spyOn(view, "setLoadingSectionVisibility");
		spyOn(view, "cleanAnswer");
		spyOn(view, "setIconOKVisibility");
		
		var data = {};
		presenter.renderQuestion(data);
		
		expect(view.showQuestion).toHaveBeenCalledWith(data);
		expect(view.setLoadingSectionVisibility).toHaveBeenCalledWith(false);
		expect(view.cleanAnswer).toHaveBeenCalled();
		expect(view.setIconOKVisibility).toHaveBeenCalledWith(false);
	});

	
    it("should be successful", function () {
        spyOn(view, "setJavascriptExecutingIndicator");

        presenter.showJavascriptWorking();

        expect(view.setJavascriptExecutingIndicator).toHaveBeenCalledWith("Hey, it looks like JS is working!!!");
    });
	
	it("should hide elements", function() {
		spyOn(view, "setElementsToInvisible");

		presenter.hideAllElements();
		
        expect(view.setElementsToInvisible).toHaveBeenCalled();

	});

	it("should show the tick if the answer is correct", function() {
		spyOn(view, "setIconOKVisibility");
		spyOn(view, "getUserAnswer").andReturn('abc');
		spyOn(view, "setNextButtonVisibility");
		spyOn(view, "setGiveupSectionVisibility");
		presenter.answer = 'abc';
		
		presenter.verifyAnswer();

		expect(view.getUserAnswer).toHaveBeenCalled();
		expect(view.setIconOKVisibility).toHaveBeenCalledWith(true);
		expect(view.setNextButtonVisibility).toHaveBeenCalledWith(true);
		expect(view.setGiveupSectionVisibility).toHaveBeenCalledWith(false);
	});	

	it("should show the tick if the answer is correct but with whitespaces", function() {
		spyOn(view, "setIconOKVisibility");
		spyOn(view, "getUserAnswer").andReturn(' abc ');
		spyOn(view, "setNextButtonVisibility");
		spyOn(view, "setGiveupSectionVisibility");
		presenter.answer = 'abc';
		
		presenter.verifyAnswer();

		expect(view.getUserAnswer).toHaveBeenCalled();
		expect(view.setIconOKVisibility).toHaveBeenCalledWith(true);
		expect(view.setNextButtonVisibility).toHaveBeenCalledWith(true);
		expect(view.setGiveupSectionVisibility).toHaveBeenCalledWith(false);
	});	
	
	it("should hide the tick if the answer is wrong", function() {
		spyOn(view, "setIconOKVisibility");
		spyOn(view, "getUserAnswer").andReturn('def');
		spyOn(view, "setNextButtonVisibility");
		spyOn(view, "setGiveupSectionVisibility");
		
		presenter.verifyAnswer();
		
		expect(presenter.answer).toEqual('***');
		expect(view.setIconOKVisibility).toHaveBeenCalledWith(false);
		expect(view.setNextButtonVisibility).toHaveBeenCalledWith(false);
		expect(view.setGiveupSectionVisibility).toHaveBeenCalledWith(true);
	});		

	it("should show correct answer when I give up", function() {
		spyOn(view, "setAnswerSectionVisibility");
		spyOn(view, "setCorrectAnswerText");
		spyOn(view, "setGiveupSectionVisibility");
		spyOn(view, "setNextButtonVisibility");
		presenter.answer = 'abc';

		presenter.showCorrectAnswer();
		
		expect(view.setAnswerSectionVisibility).toHaveBeenCalledWith(true);
		expect(view.setCorrectAnswerText).toHaveBeenCalledWith('abc');
		expect(view.setGiveupSectionVisibility).toHaveBeenCalledWith(false);
		expect(view.setNextButtonVisibility).toHaveBeenCalledWith(true);
	});

	
});

describe("view", function () {
	beforeEach(function() {
		$("<div id='loading-section'></div>").appendTo("body");
		$("#loading-section").hide();

		$("<div id='question-section'><p id='question'></p></div>").appendTo("body");
		$("#question-section").hide();
	});
	
	afterEach(function() {
		$("#loading-section").remove();
		$("#question-section").remove();
	});
	
	it("should show the question", function() {
		var view = tdd.buildView();
		
		var data = {question: "What is the capital of London?", answer: "London"};
		view.showQuestion(data);
		
		expect($("#question-section").is(":visible")).toBeTruthy();
		expect($("#question").text()).toEqual(data.question);
	});


	it("should make loading section visible", function() {
		var view = tdd.buildView();
		
		view.setLoadingSectionVisibility(true);
		
		expect($("#loading-section").is(":visible")).toBeTruthy();
	});
});

describe("remoteService", function () {
	it("fetchQuestion should invoke callback", function() {
		var callback = jasmine.createSpy();
		var remoteService = tdd.buildRemoteService();

		remoteService.fetchQuestion(callback);
		
        expect(callback).toHaveBeenCalled();

	});
});
*/

