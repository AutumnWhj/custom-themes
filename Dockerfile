
FROM stilleshan/coscmd AS build
ARG VERSION=1638862735537
ARG OSS_SECRET_ID
ARG OSS_SECRET_KEY
ARG OSS_BUCKET
ARG OSS_REGION

RUN coscmd config -a ${OSS_SECRET_ID} -s ${OSS_SECRET_KEY} -b ${OSS_BUCKET} -r ${OSS_REGION} && coscmd download -rf version-manage/master/default /dist

FROM nginx:1.16.1

MAINTAINER hao.liu@belloai.com

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /dist /src/dist

COPY msg.sh /src/msg.sh
COPY package.json /src/package.json

EXPOSE 80

ENV TZ Asia/Shanghai

# RUN chmod a+x /src/msg.sh
# RUN apt-get update && apt-get install -y curl
# ENTRYPOINT [ "/src/msg.sh" ]
       