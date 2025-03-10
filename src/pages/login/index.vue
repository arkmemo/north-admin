<template>
    <div class="Body">
        <div class="Login">
            <div flex-between items-center>
                <div class="Heard">Hi~欢迎使用</div>
				<div class="Button" flex items-center @click="toggleLoginType">
					<ZIcon width="14px" height="14px" v-show="formData.type === 'code'" icon="../images/login/sms.svg" mr2px />
					<ZIcon width="14px" height="14px" v-show="formData.type === 'password'" icon="../images/login/password.svg" mr2px />
					<span v-show="formData.type === 'code'">短信登录</span>
					<span v-show="formData.type === 'password'">密码登录</span>
				</div>
            </div>
            <div mt8px flex items-center class="openAccount">
                没有账户？<div @click="">注册账户</div>
            </div>
            <div class="Form" mt28px>
                <div class="Input" @click="userInput.focus()" :class="{Action:isUsername||formData.phone,ActionBorder:isUsername}">
                    <div flex flex-column style="width: 100%">
                        <div class="label">手机号</div>
                        <input autocomplete="on" @keyup.enter.native="" ref="userInput" @focus="isUsername=true" @blur="isUsername=false" type="text" v-model="formData.phone" name="username"></input>
                    </div>
                    <div flex items-center>
                        <div class="Input-Button" v-show="formData.phone&&isUsername" @click.stop="formData.phone = ''">
                            <ZIcon width="16px" height="16px" icon="../images/login/cancel.svg"/>
                        </div>
                        <img src="../../assets/images/login/account.svg">
                    </div>
                </div>
                <div mt20px class="Input" @click="passwordInput.focus()" :class="{Action:isPassword||formData.password,ActionBorder:isPassword}">
                    <div flex flex-column style="width: 100%">
                        <div class="label">密码</div>
                        <input autocomplete="on" @keyup.enter.native="" :type="eyeType" ref="passwordInput" @focus="isPassword=true" @blur="isPassword=false" v-model="formData.password" name="password"></input>
                    </div>
                    <div flex items-center>
                        <div class="Input-Button" v-show="formData.password&&isPassword" @click="formData.password = ''">
                            <ZIcon width="16px" height="16px" icon="../images/login/cancel.svg"/>
                        </div>
                        <img v-show="eyeType == 'password'" @click.stop="eyeType = 'text'" class="eye" src="../../assets/images/login/eyeClose.svg">
                        <img v-show="eyeType == 'text'" @click.stop="eyeType = 'password'" class="eye" src="../../assets/images/login/eye.svg">
                    </div>
                </div>
            </div>
            <div flex-between items-center class="FunctionCss">
                <div v-show="formData.type == 'password'" flex items-center class="Checkbox" @click="autoLogin = !autoLogin" :class="{CheckboxAction:autoLogin}">
                    <div class="Checkbox-Button" >
                        <div v-show="autoLogin">√</div>
                    </div><span>记住密码</span>
                </div>
                <div class="Hover" v-show="formData.type == 'password'" @click="">忘记密码</div>
            </div>
            <div class="Submit" @click="Submit">
                <div class="content">
					立即登录
                </div>
            </div>
            <div class="Foot">
                <span @click=""> 用户条款 </span>
                <span @click=""> 隐私协议 </span>
            </div>
        </div>
		<LayoutTheme />
    </div>
</template>
<script setup lang="ts">
import LayoutTheme from '../../layouts/components/LayoutTheme/index.vue'
const eyeType = ref('password')

const formData = ref<IAuthLogin>({
	phone: '13025254567',
    password: '123456Aa;',
	captcha: '',
    type:'password'
})
const userInput = ref()
const passwordInput = ref()
const isUsername = ref(false)
const isPassword = ref(false)
const autoLogin = ref(false)

const toggleLoginType = () => {
    formData.value.type = formData.value.type === 'password' ? 'code' : 'password'
}
const { login } = useUserStore()
const Submit = () => {
	login(formData.value)
}
</script>

<style scoped lang="scss">
:deep(.el-popover){
    border-radius: 16px !important;
    background-color:#ffffff00 !important;
}
.active{
    color: #fff !important;
    border-color: #5B5D6EFF !important;
}
.popoverContainer{
    width: 96px;
    border-radius: 16px;
    border: 1px solid rgba(47,49,64,0.4);
    margin: auto;
    overflow: hidden;
    .Item{
        width: 90%;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 12px;
        color: rgba(255,255,255,0.5);
        line-height: 16px;
        padding: 4px 8px;
        cursor: pointer;
    }
    .white{
        color: white;
    }
    .Item:hover{
        background: rgba(34,36,49,0.5) !important;
    }
}
.multilingual{
    width: 96px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid rgba(47,49,64,0.4);
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #FFFFFF80;
    line-height: 16px;
    cursor: pointer;
    z-index: 1;
    .ICon{
        width: 24px;
        height: 24px;
        background: #242839;
        border-radius:50% ;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 4px;
    }
}
.resend{
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    line-height: 16px;
    cursor:default;
}
.codeCss{
    font-size: 12px;
    color: #FFFFFF;
    width: fit-content;
    white-space: nowrap;
    margin-left: 8px;
    cursor: pointer;
}
.eye{
    cursor: pointer;
}
.Foot{
    width: calc(100% - 40px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    line-height: 16px;
    text-align: center;
    margin: auto;
    margin-top: 24px;
    white-space: pre-wrap;
    span{
        color: #ffffff;
        cursor: pointer;
    }
    span:hover{
        color: #D2a75B;
    }
}
.Submit{
    width: 100% ;
    height: 44px;
    background: radial-gradient( 461% 144% at 50% -25%, #535A6FFF 0%, #292D3AFF 100%);;
    border-radius: 8px;
    margin-top: 32px;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 44px;
    text-align: center;
    cursor: pointer;
	transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    padding: 1px;
    .content{
        width: 100%;
        height: 100%;
        border-radius: 7px;
        background: radial-gradient(80% 180% at 50% -50%, #2F354A 0%, #1A1D2D 100%);
    }
}
.Submit:hover{
    background: radial-gradient( 461% 144% at 50% -25%, #5D657BFF 0%, #313544FF 100%);
    .content{
        background: radial-gradient(80% 180% at 50% -50%, #32384EFF 0%, #1E2234FF 100%);
    }
}
.FunctionCss{
    height: 16px;
    margin-top: 26px;
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    line-height: 16px;
    user-select: none;
    div{
        cursor: pointer;
    }
    .Hover:hover{
        color: #fff;
    }
    .CheckboxAction{
        color: #FFFFFF;
        .Checkbox-Button{
            background: #FFFFFF;
            color: #000 !important;
        }
    }
    .Checkbox{
        &-Button{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            width: 10px;
            height: 10px;
            font-size: 12px;
            border-radius: 2px;
            border: 1px solid rgba(255,255,255,0.5);
            margin-right: 4px;
        }
    }
}
*{
    // 过渡动画
    transition: all 0.2s ease;
    user-select: none;
}
.Body{
    width: 100%;
    height: 100vh;
    background-size: 100%;
    background-color: #000;
    position: relative;
    .flow-bottom{
        position: absolute;
        width:1280px;
        bottom: 25px;
        left: 0;
        z-index: 0;
    }
    .flow-top-left{
        position: absolute;
        width:469px;
        top: 68px;
        left: 0;
        z-index: 0;
    }
    .flow-top-right{
        position: absolute;
        width:469px;
        top: 107px;
        right: 0;
        z-index: 0;
    }
    .gold{
        position: absolute;
        width: 72px;
        left: 200px;
        top: 240px;
    }
    .silver{
        position: absolute;
        width: 64px;
        top: 230px;
        right: 180px;
    }
    .usdx{
        position: absolute;
        width: 56px;
        top: 435px;
        right: 225px;
    }
}
.Login {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    width: 386px;
    // height: 424px;
    // background: rgba(20, 24, 37, 0.8);
    box-shadow: inset 0px 1px 40px 0px #1F2232;
    border-radius: 30px;
    border-image: radial-gradient(circle, rgba(131, 137, 167, 1), rgba(131, 137, 167, 0.08)) 1 1;
    backdrop-filter: blur(2px);
    margin: auto;
    padding: 40px 28px;
    border:1px solid #282D3E;
    .Form{
        .Input{
            height: 44px;
            border-radius: 8px;
            border: 1px solid #2F3140;
            padding: 0px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            top:8px;
            cursor:text;
            &-Button{
                color: #FFFFFF80;
                cursor: pointer;
				display: flex;
				align-items: center;
				margin-right: 8px;
            }
            &-Button:hover{
                color: #ffffff;
            }
            .label{
                
                font-size: 12px;
                color: rgba(255,255,255,0.2);
                line-height: 22px;
                position: absolute;
                top: 12px;
            }
            input{
                padding-left: 0px;
                width: 100%;
                background-color: #ffffff00;
                border:0px;
                outline: none;
                font-size: 14px;
                color: #FFFFFF;
                position: relative;
                z-index: 1;
            }
            input::-webkit-input-placeholder {
                padding-left: 0px;
                
                font-size: 12px;
                color: rgba(255,255,255,0.2);
            }
        }
        .Action{
            .label{
                top: 2px;
                font-size: 10px;
                color: #FFFFFF80;
            }
            input{
                padding-left: 0px;
                top:8px
            }
        }
        .ActionBorder{
            border: 1px solid #5B5D6E;
        }
    }
    .openAccount{
        position: relative;
        font-size: 12px;
        color: rgba(255,255,255,0.5);
        line-height: 16px;
        z-index: 1;
        div{
            
            font-size: 12px;
            color: #FFFFFF;
            line-height: 16px;
            cursor: pointer;
            
            font-size: 12px;
            color: #FFFFFF;
            line-height: 16px;
        }
        div:hover{
            color: #D2a75B;
        }
    }
    .Heard{
        font-size: 24px;
        color: #FFFFFF;
        line-height: 28px;
    }
    .Button{
        width: fit-content;
        height: fit-content;
        padding: 6px 8px;
        border-radius: 14px;
        border: 1px solid #2F3140;
        font-size: 12px;
        color: rgba(255,255,255,0.5);
        cursor: pointer;
        user-select: none;
    }
    .Button:hover{
        color: #fff;
        border: 1px solid #5B5D6EFF;
        *{  
            color: #fff;
        }
    }
}
.Loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px !important;
    left: -1px !important;
    inset: 0;
    opacity: 0.8;
    border-radius: 31px;
    padding: 1px;
    background: conic-gradient(from var(--Loading-Deg),transparent 0,#8389A7 20%,transparent 25%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
}
</style>
