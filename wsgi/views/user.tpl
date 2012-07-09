%#list of currents posts
%include shared/header.tpl header=page,logged=logged
<div id="main">
	%if logged and not himself:
		%if is_following:
		<form action="/unfollow/{{username}}" method="post" accept-charset="utf-8" class="unfollow-user">	
			<p><input type="submit" value="Unfollow {{username}}"></p>
		</form>
		%else:
		<form action="/follow/{{username}}" method="post" accept-charset="utf-8" class="follow-user">	
			<p><input type="submit" value="Follow {{username}}"></p>
		</form>
		%end
	%end
	<div class="tweets">
	%if postlist:
  	%for tweet in postlist:
  		<p><img src="/static/avatar.png" /> <strong><a href="/{{tweet['uid']}}">{{tweet['uid']}}</a></strong> {{tweet['content']}}<span><a href="/{{username}}/statuses/{{tweet['_id']}}">permalink</a></span></p>
  	%end
  %else:
   <p>{{username}} has not posted yet</p>
  %end
	</div>
</div>
%include shared/side.tpl username=username,userlist=userlist
	
%include shared/footer.tpl