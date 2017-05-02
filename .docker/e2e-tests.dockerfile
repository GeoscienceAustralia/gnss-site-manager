FROM ubuntu:17.04

ENV no_proxy=localhost

RUN apt-get update -y
RUN apt-get install -y git
RUN apt-get install -y chromium-browser
RUN apt-get install -y build-essential
RUN apt-get install -y libssl-dev
RUN apt-get install -y curl
RUN apt-get install -y openjdk-8-jre

RUN useradd -ms /bin/bash tester
RUN mkdir -p /home/tester && \
    chown tester:tester -R /home/tester

USER tester

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
RUN bash -c "(. ~/.nvm/nvm.sh && nvm install 6.10.2)"

ADD ${pwd} /home/tester/gnss-site-manager

CMD bash -c "(cd ~/gnss-site-manager && . ~/.nvm/nvm.sh && npm run e2e.ci)"
