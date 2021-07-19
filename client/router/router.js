const routers = [
    {
        path: '/loginRegister',
        meta: {
            title: '注册登陆',
        },
        component: (resolve) => require(['../components/login.vue'],resolve)
    },
    {
        path: '*',
        component: (resolve) => require(['../components/main.vue'],resolve),
        children: [
            {
                path: '/softwarelist',
                meta: {
                    title: '软件列表'
                },
                component: (resolve) => require(['../components/softwarelist.vue'], resolve)
            },
            {
                path: '/softwaredetails/:id',
                meta: {
                    title: '软件详情'
                },
                component: (resolve) => require(['../components/softwaredetails.vue'], resolve)
            },
            {
                path: '/downloadRecord',
                meta: {
                    title: '下载历史'
                },
                component: (resolve) => require(['../components/downloadRecord.vue'], resolve)
            },
            {
                path: '*',
                redirect: '/softwarelist'
            }
        ]
    }
];
export default routers;