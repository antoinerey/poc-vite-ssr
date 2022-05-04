<template>
  <RouterView #default="{ Component }">
    <Suspense>
      <div>
        <component :is="Component" />
      </div>
    </Suspense>
  </RouterView>
</template>
