FROM webratio/phonegap:6.2.2

MAINTAINER PicComunica "piccomunica@gmail.com"

RUN npm install -g bower@latest --yes && \
	npm install -g grunt-cli@latest --yes && \
	npm install -g polymer-cli@0.17.0 --yes

CMD ["bash"]