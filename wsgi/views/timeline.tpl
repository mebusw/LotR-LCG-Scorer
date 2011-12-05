%#list of currents posts
%include shared/header.tpl header=page,logged=logged
<div id="main">
%include shared/form.tpl
	
	<div class="tweets">
	%for tweet in postlist:
		<p><img src="/static/avatar.png" /> <strong><a href="/{{tweet['uid']}}">{{tweet['uid']}}</a></strong> {{tweet['content']}}<span><a href="/{{tweet['uid']}}/statuses/{{tweet['_id']}}">permalink</a></span></p>
	%end
	</div>
</div>
%include shared/side.tpl username=username
	
%include shared/footer.tpl