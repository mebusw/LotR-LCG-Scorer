%#single post template
%include shared/header.tpl header=page,logged=logged
<div class="tweets">
	<p><img src="/static/avatar.png" /> <strong><a href="/{{username}}">{{username}}</a></strong> {{tweet_text}}<span><a href="/{{username}}/statuses/{{tweet_id}}">permalink</a></span></p>
</div>
%include shared/footer.tpl