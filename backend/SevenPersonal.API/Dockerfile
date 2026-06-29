# ===== Build =====
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia os csproj e restaura (cache de camadas)
COPY SevenPersonal.sln ./
COPY SevenPersonal.Domain/SevenPersonal.Domain.csproj SevenPersonal.Domain/
COPY SevenPersonal.Repository/SevenPersonal.Repository.csproj SevenPersonal.Repository/
COPY SevenPersonal.Application/SevenPersonal.Application.csproj SevenPersonal.Application/
COPY SevenPersonal.Services/SevenPersonal.Services.csproj SevenPersonal.Services/
COPY SevenPersonal.API/SevenPersonal.API.csproj SevenPersonal.API/
RUN dotnet restore SevenPersonal.API/SevenPersonal.API.csproj

# Copia o restante e publica
COPY . .
RUN dotnet publish SevenPersonal.API/SevenPersonal.API.csproj -c Release -o /app/publish /p:UseAppHost=false

# ===== Runtime =====
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Render injeta a porta na env PORT (lida no Program.cs). Fallback local:
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "SevenPersonal.API.dll"]
