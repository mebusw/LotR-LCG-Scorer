<div id="side">
	<p class="bio">
		<img src="/static/avatar-small.png" />{{username}}
	</p>
	<div>
	<ul class="follow">
            %for lusername in userlist:
	        <li><strong><a href="/{{lusername}}">{{lusername}}</a></strong></li>
            %end

	</ul>
</div>